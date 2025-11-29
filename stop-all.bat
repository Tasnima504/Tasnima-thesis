@echo off
echo ========================================
echo  Stopping All Servers
echo ========================================
echo.
echo Stopping all Node.js processes...
taskkill /F /IM node.exe
echo.
echo All servers stopped!
echo ========================================
pause
