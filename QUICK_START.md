# Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Setup MongoDB
Get your free MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Step 3: Configure Backend
```bash
cd backend
copy .env.example .env
```
Edit `.env` and add your MongoDB URI

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm start
```

**Terminal 3 - Admin Panel:**
```bash
cd admin
npm start
```

### Step 5: Access the Application
- 🛍️ **Customer Store**: http://localhost:3000
- ⚙️ **Admin Panel**: http://localhost:3001
- 🔧 **Backend API**: http://localhost:4000

---

## 📝 First Time Setup Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB Atlas account created
- [ ] All dependencies installed (`npm run install-all`)
- [ ] `.env` file created in backend folder
- [ ] MongoDB URI added to `.env` file
- [ ] All three servers running

## 🎯 Testing the Application

1. **Open Customer Frontend** (http://localhost:3000)
   - Browse products
   - Sign up for an account
   - Add items to cart

2. **Open Admin Panel** (http://localhost:3001)
   - Add new products
   - View all products
   - Manage inventory

3. **Check Backend** (http://localhost:4000)
   - API should return "Root" message

## ❓ Common Issues

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot connect to MongoDB"
- Check your MongoDB URI in `backend/.env`
- Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for testing)
- Ensure database user credentials are correct

### "Module not found"
```bash
# Reinstall dependencies
npm run install-all
```

---

For detailed documentation, see [README.md](README.md)
