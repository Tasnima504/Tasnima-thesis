const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const SSLCommerzPayment = require('sslcommerz-lts');
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => {
  console.log("MongoDB Connection Error:", err.message);
  console.log("Server running without database. Login/Signup features disabled.");
});

// paste your mongoDB Connection string above with password
// password should not contain '@' special character


//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})


// Route for Images folder
app.use('/images', express.static('upload/images'));


// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


// Schema for creating user model
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});


// Schema for creating Product
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});


// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});


// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id
          }
        }
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
      }
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(503).json({ success: false, errors: "Database not available. Please install MongoDB to use login feature." });
  }
})


//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
  } catch (error) {
    console.log("Signup error:", error.message);
    return res.status(503).json({ success: false, errors: "Database not available. Please install MongoDB to use signup feature." });
  }
})


// endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
  } catch (error) {
    console.log("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Database not available" });
  }
});


// endpoint for getting latest products data
app.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    let arr = products.slice(0).slice(-8);
    console.log("New Collections");
    res.send(arr);
  } catch (error) {
    console.log("Error fetching new collections:", error.message);
    res.status(500).json({ success: false, message: "Database not available" });
  }
});


// endpoint for getting womens products data
app.get("/popularinwomen", async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
  } catch (error) {
    console.log("Error fetching popular in women:", error.message);
    res.status(500).json({ success: false, message: "Database not available" });
  }
});

// endpoint for getting womens products data
app.post("/relatedproducts", async (req, res) => {
  try {
    console.log("Related Products");
    const {category} = req.body;
    const products = await Product.find({ category });
    const arr = products.slice(0, 4);
    res.send(arr);
  } catch (error) {
    console.log("Error fetching related products:", error.message);
    res.status(500).json({ success: false, message: "Database not available" });
  }
});


// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
  } catch (error) {
    console.log("Add to cart error:", error.message);
    res.status(500).json({ success: false, errors: "Failed to add to cart" });
  }
})


// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] != 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  } catch (error) {
    console.log("Remove from cart error:", error.message);
    res.status(500).json({ success: false, errors: "Failed to remove from cart" });
  }
})


// Create an endpoint for getting cartdata of user
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    console.log("Get cart error:", error.message);
    res.status(500).json({ success: false, errors: "Failed to get cart" });
  }
})


// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    }
    else { id = 1; }
    const product = new Product({
      id: id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name })
  } catch (error) {
    console.log("Add product error:", error.message);
    res.status(500).json({ success: false, errors: "Database not available. Cannot add product without MongoDB." });
  }
});


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name })
  } catch (error) {
    console.log("Remove product error:", error.message);
    res.status(500).json({ success: false, errors: "Database not available. Cannot remove product without MongoDB." });
  }
});


// SSLCommerz Payment Integration
const store_id = process.env.STORE_ID || 'testbox';
const store_passwd = process.env.STORE_PASSWORD || 'qwerty';
const is_live = process.env.IS_LIVE === 'true'; // true for live, false for sandbox

// Initialize payment
app.post('/init-payment', async (req, res) => {
  try {
    const { total_amount, cus_name, cus_email, cus_phone, cus_add1, product_name, product_category } = req.body;
    
    const tran_id = 'TXN_' + Date.now();
    
    const data = {
      total_amount: total_amount,
      currency: 'BDT',
      tran_id: tran_id,
      success_url: `http://localhost:4000/payment/success/${tran_id}`,
      fail_url: `http://localhost:4000/payment/fail/${tran_id}`,
      cancel_url: `http://localhost:4000/payment/cancel/${tran_id}`,
      ipn_url: `http://localhost:4000/payment/ipn`,
      shipping_method: 'Courier',
      product_name: product_name || 'E-commerce Products',
      product_category: product_category || 'General',
      product_profile: 'general',
      cus_name: cus_name,
      cus_email: cus_email,
      cus_add1: cus_add1 || 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: cus_phone,
      cus_fax: '01711111111',
      ship_name: cus_name,
      ship_add1: cus_add1 || 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({ url: GatewayPageURL, status: 'success' });
      console.log('Redirecting to: ', GatewayPageURL);
    }).catch(error => {
      console.log('Payment init error:', error);
      res.status(500).json({ status: 'failed', message: 'Payment initialization failed' });
    });
  } catch (error) {
    console.log('Payment error:', error.message);
    res.status(500).json({ status: 'failed', message: error.message });
  }
});

// Payment success
app.post('/payment/success/:tranId', (req, res) => {
  console.log('Payment successful:', req.params.tranId);
  console.log('Payment data:', req.body);
  res.redirect(`http://localhost:3000/payment/success?tranId=${req.params.tranId}`);
});

// Payment failure
app.post('/payment/fail/:tranId', (req, res) => {
  console.log('Payment failed:', req.params.tranId);
  res.redirect(`http://localhost:3000/payment/fail?tranId=${req.params.tranId}`);
});

// Payment cancel
app.post('/payment/cancel/:tranId', (req, res) => {
  console.log('Payment cancelled:', req.params.tranId);
  res.redirect(`http://localhost:3000/payment/cancel?tranId=${req.params.tranId}`);
});

// Payment IPN (Instant Payment Notification)
app.post('/payment/ipn', (req, res) => {
  console.log('IPN received:', req.body);
  res.status(200).send('IPN received');
});

// Validate payment
app.post('/validate-payment', async (req, res) => {
  try {
    const { val_id } = req.body;
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    
    sslcz.validate({ val_id: val_id }).then(data => {
      console.log('Validation response:', data);
      res.json(data);
    }).catch(error => {
      console.log('Validation error:', error);
      res.status(500).json({ status: 'failed', message: 'Validation failed' });
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
  }
});


// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});