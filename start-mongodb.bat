@echo off
echo ========================================
echo  Starting MongoDB Server
echo ========================================
echo.
echo Checking for MongoDB installation...

if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" (
    echo MongoDB found! Starting server...
    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
) else if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
    echo MongoDB found! Starting server...
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath "C:\data\db"
) else if exist "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" (
    echo MongoDB found! Starting server...
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath "C:\data\db"
) else (
    echo.
    echo MongoDB is not installed!
    echo.
    echo Please install MongoDB Community Server from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo Or run the application without MongoDB (limited features)
    echo.
    pause
)
