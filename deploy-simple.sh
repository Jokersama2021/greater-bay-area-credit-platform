#!/bin/bash

# 简单部署脚本 - 适用于展示环境
# 使用方法: ./deploy-simple.sh [端口号]

PORT=${1:-3000}

echo "🚀 开始部署粤港澳大湾区信用平台..."
echo "📦 正在构建生产版本..."

# 检查是否有 node_modules
if [ ! -d "node_modules" ]; then
    echo "📥 正在安装依赖..."
    npm install
fi

# 构建生产版本
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "🌐 正在启动服务器..."
    echo "📍 访问地址: http://localhost:$PORT"
    echo "⏹️  按 Ctrl+C 停止服务"
    echo ""
    
    # 检查是否安装了 serve
    if ! command -v serve &> /dev/null; then
        echo "📥 正在安装 serve..."
        npm install -g serve
    fi
    
    # 启动服务
    serve -s dist -l $PORT
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
