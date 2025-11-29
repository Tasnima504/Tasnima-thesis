@echo off
echo ========================================
echo  Restarting All Servers
echo ========================================
echo.
echo Stopping existing servers...
taskkill /F /IM node.exe
timeout /t 2 /nobreak >nul
echo.
echo Starting all servers...
npm start
