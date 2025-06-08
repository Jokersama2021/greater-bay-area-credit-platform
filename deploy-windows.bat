@echo off
echo ========================================
echo  Greater Bay Area Credit Platform
echo  Windows Server Deployment Script
echo ========================================

echo.
echo [1/5] Pulling latest code from GitHub...
git pull origin main

echo.
echo [2/5] Installing dependencies...
call npm install

echo.
echo [3/5] Building production version...
call npm run build

echo.
echo [4/5] Copying files to web directory...
if exist "C:\inetpub\wwwroot\backup" rmdir /s /q "C:\inetpub\wwwroot\backup"
if exist "C:\inetpub\wwwroot\index.html" (
    mkdir "C:\inetpub\wwwroot\backup"
    xcopy "C:\inetpub\wwwroot\*" "C:\inetpub\wwwroot\backup\" /E /Y
)

xcopy "dist\*" "C:\inetpub\wwwroot\" /E /Y

echo.
echo [5/5] Copying web.config for Vue Router support...
copy "web.config" "C:\inetpub\wwwroot\web.config" /Y

echo.
echo ========================================
echo  Deployment completed successfully!
echo  Website URL: http://cn.cjplab.cityu.mo.cn
echo ========================================

echo.
echo Press any key to exit...
pause >nul
