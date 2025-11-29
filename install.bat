@echo off
echo ========================================
echo E-Commerce Project Setup
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

echo Step 2: Installing Frontend Dependencies...
cd Frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo Step 3: Installing Admin Panel Dependencies...
cd admin
call npm install
if errorlevel 1 (
    echo ERROR: Admin installation failed!
    pause
    exit /b 1
)
cd ..
echo Admin panel dependencies installed successfully!
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Setup MongoDB (see README.md)
echo 2. Create backend/.env file from backend/.env.example
echo 3. Add your MongoDB URI to backend/.env
echo 4. Run the application (see QUICK_START.md)
echo.
pause
