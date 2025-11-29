@echo off
echo ========================================
echo Starting E-Commerce Application
echo ========================================
echo.
echo This will open 3 terminal windows:
echo 1. Backend Server (Port 4000)
echo 2. Customer Frontend (Port 3000)
echo 3. Admin Panel (Port 3001)
echo.
echo Make sure you have:
echo - Installed dependencies (run install.bat)
echo - Created backend/.env file
echo - Added MongoDB URI to backend/.env
echo.
pause

echo Starting Backend Server...
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

echo Starting Customer Frontend...
start cmd /k "cd Frontend && npm start"
timeout /t 3 /nobreak >nul

echo Starting Admin Panel...
start cmd /k "cd admin && npm start"

echo.
echo ========================================
echo All servers are starting!
echo ========================================
echo.
echo Access the application at:
echo - Customer Store: http://localhost:3000
echo - Admin Panel: http://localhost:3001
echo - Backend API: http://localhost:4000
echo.
echo Close this window after all servers have started.
pause
