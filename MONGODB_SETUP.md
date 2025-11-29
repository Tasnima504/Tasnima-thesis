# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

MongoDB Atlas provides a free cloud database that's perfect for development and small projects.

### Step-by-Step Setup:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google account

2. **Create a Cluster**
   - Choose "Shared" (Free tier)
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to you
   - Click "Create Cluster"
   - Wait 1-3 minutes for cluster creation

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Authentication Method: "Password"
   - Username: `admin` (or any name you prefer)
   - Password: Create a strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - Wait for status to become "Active"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 4.1 or later
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Configure Backend**
   - Open `backend/.env` file
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/e-commerce?retryWrites=true&w=majority`
   - **Important**: Don't use special characters like @ in your password

### Example .env Configuration:
```env
PORT=4000
MONGODB_URI=mongodb+srv://admin:MyPassword123@cluster0.abc12.mongodb.net/e-commerce?retryWrites=true&w=majority
JWT_SECRET=secret_ecom
```

---

## Option 2: Local MongoDB Installation

If you prefer to run MongoDB on your local machine:

### Windows Installation:

1. **Download MongoDB**
   - Go to https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server
   - Run the installer
   - Choose "Complete" installation
   - Install as a service

2. **Verify Installation**
   ```bash
   mongod --version
   ```

3. **Configure Backend**
   - Open `backend/.env`
   - Use local connection string:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/e-commerce
   JWT_SECRET=secret_ecom
   ```

4. **Start MongoDB Service**
   - MongoDB should start automatically as a Windows service
   - Or run: `net start MongoDB`

---

## Troubleshooting

### "MongoNetworkError" or "Connection Timeout"
- Check if your IP is whitelisted in MongoDB Atlas
- Verify your internet connection
- Try using 0.0.0.0/0 for IP whitelist (development only)

### "Authentication Failed"
- Double-check username and password in connection string
- Make sure password doesn't contain special characters like @, :, or /
- If it does, URL-encode the password

### "Database Connection Error"
- Verify the connection string format
- Check if MongoDB service is running (for local installation)
- Make sure `.env` file exists in backend folder
- Restart the backend server after changing .env

### Testing Your Connection

Run this from backend folder:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✓ Connected!')).catch(err => console.log('✗ Error:', err.message));"
```

---

## Security Best Practices

### For Development:
- Use 0.0.0.0/0 IP whitelist (Allow from anywhere)
- Use simple passwords without special characters

### For Production:
- Whitelist only specific IP addresses
- Use strong, complex passwords
- Enable authentication
- Use environment variables
- Never commit .env file to git

---

## Need Help?

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB Installation Guide: https://docs.mongodb.com/manual/installation/
- Community Support: https://www.mongodb.com/community/forums/
