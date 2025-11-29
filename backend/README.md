# E-Commerce Backend API

Node.js/Express backend server for the e-commerce application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
copy .env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=secret_ecom
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## API Endpoints

### Root
- `GET /` - Health check

### Authentication
- `POST /signup` - Register new user
- `POST /login` - Login user

### Products
- `GET /allproducts` - Get all products
- `GET /newcollections` - Get latest 8 products
- `GET /popularinwomen` - Get 4 popular women products
- `POST /relatedproducts` - Get related products by category
- `POST /addproduct` - Add new product (Admin)
- `POST /removeproduct` - Remove product

### Cart (Requires Authentication)
- `POST /addtocart` - Add item to cart
- `POST /removefromcart` - Remove item from cart
- `POST /getcart` - Get user cart

### Upload
- `POST /upload` - Upload product image

## Database Schema

### User
- name: String
- email: String (unique)
- password: String
- cartData: Object
- date: Date

### Product
- id: Number (auto-increment)
- name: String
- description: String
- image: String
- category: String
- new_price: Number
- old_price: Number
- date: Date
- available: Boolean

## Authentication

Uses JWT (JSON Web Token) for authentication. Include token in request header:
```
auth-token: your_jwt_token
```

## File Upload

Product images are stored in `upload/images/` directory.
