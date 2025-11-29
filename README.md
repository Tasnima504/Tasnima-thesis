# E-Commerce Full Stack Application

A complete full-stack e-commerce application built with React.js for frontend, Node.js/Express for backend, and MongoDB for database.

> 🎯 **New to this project?** Start with [START_HERE.md](START_HERE.md) for a quick overview!
> 
> ⚡ **Want to get running fast?** See [QUICK_START.md](QUICK_START.md) for 5-minute setup!

---

## Project Structure

```
Tasnima-thesis-main/
├── backend/          # Node.js/Express backend server
├── Frontend/         # React.js customer-facing website
├── admin/           # React.js admin panel
└── README.md        # This file
```

## Features

### Customer Frontend
- Browse products by category (Men, Women, Kids)
- Product detail pages
- Shopping cart functionality
- User authentication (Login/Signup)
- Related products display
- New collections showcase

### Admin Panel
- Add new products
- List all products
- Remove products
- Upload product images
- Product management dashboard

### Backend API
- RESTful API with Express.js
- MongoDB database integration
- JWT authentication
- Image upload with Multer
- CORS enabled
- User management
- Product management
- Cart operations

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB installation

## Installation

### 1. Clone the repository
```bash
cd Tasnima-thesis-main
```

### 2. Install all dependencies
Run this command from the root directory to install dependencies for all three parts:
```bash
npm run install-all
```

Or install manually for each part:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install

# Install admin dependencies
cd ../admin
npm install
```

### 3. Configure Backend Environment

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

3. Edit the `.env` file and add your MongoDB connection string:
```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/e-commerce
JWT_SECRET=secret_ecom
```

**Note:** Replace `username`, `password`, and `cluster` with your actual MongoDB credentials.

### 4. Create Upload Directory

The backend needs a directory for storing uploaded images:
```bash
# From the backend folder
mkdir -p upload/images
```

## Running the Application

You need to run all three parts of the application in separate terminal windows:

### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
Backend will run on: http://localhost:4000

### Terminal 2 - Customer Frontend
```bash
cd Frontend
npm start
```
Frontend will run on: http://localhost:3000

### Terminal 3 - Admin Panel
```bash
cd admin
npm start
```
Admin panel will run on: http://localhost:3001 (or next available port)

## Default Ports

- **Backend API**: http://localhost:4000
- **Customer Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3001

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string from "Connect" → "Connect your application"
6. Update the `MONGODB_URI` in `backend/.env`

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/e-commerce`

## API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /login` - User login

### Products
- `GET /allproducts` - Get all products
- `GET /newcollections` - Get latest products
- `GET /popularinwomen` - Get popular women's products
- `POST /relatedproducts` - Get related products by category
- `POST /addproduct` - Add new product (Admin)
- `POST /removeproduct` - Remove product (Admin)

### Cart
- `POST /addtocart` - Add item to cart (Authenticated)
- `POST /removefromcart` - Remove item from cart (Authenticated)
- `POST /getcart` - Get user's cart (Authenticated)

### Upload
- `POST /upload` - Upload product image

## Troubleshooting

### Port Already in Use
If you see "Port already in use" error:
```bash
# Find and kill the process using the port (e.g., port 4000)
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running (for local installation)

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
Backend is configured with CORS enabled. If you still face issues, check the backend URL in:
- `Frontend/src/Context/ShopContext.jsx`
- `admin/src/App.js`

## Development

### Backend Development Mode
To run backend with auto-restart on file changes:
```bash
cd backend
npm install -g nodemon  # Install nodemon globally
npm run dev
```

### Frontend Development
React development server supports hot reload by default.

## Project Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- multer - File upload handling
- cors - CORS middleware
- dotenv - Environment variables
- body-parser - Request body parsing

### Frontend & Admin
- react - UI library
- react-router-dom - Routing
- react-scripts - React build tools

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Coding! 🚀**