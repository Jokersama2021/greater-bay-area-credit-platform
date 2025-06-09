@echo off
chcp 65001 >nul
setlocal

REM 简单部署脚本 - 适用于展示环境 (Windows)
REM 使用方法: deploy-simple.bat [端口号]

set PORT=%1
if "%PORT%"=="" set PORT=3000

echo 🚀 开始部署粤港澳大湾区信用平台...
echo 📦 正在构建生产版本...

REM 检查是否有 node_modules
if not exist "node_modules" (
    echo 📥 正在安装依赖...
    call npm install
)

REM 构建生产版本
call npm run build

if %errorlevel% equ 0 (
    echo ✅ 构建成功！
    echo 🌐 正在启动服务器...
    echo 📍 访问地址: http://localhost:%PORT%
    echo ⏹️  按 Ctrl+C 停止服务
    echo.
    
    REM 检查是否安装了 serve
    where serve >nul 2>nul
    if %errorlevel% neq 0 (
        echo 📥 正在安装 serve...
        call npm install -g serve
    )
    
    REM 启动服务
    call npx serve -s dist -l %PORT%
) else (
    echo ❌ 构建失败，请检查错误信息
    pause
    exit /b 1
)

pause
