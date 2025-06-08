#!/bin/bash

# 粤港澳大湾区跨境征信服务平台 - 自动化部署脚本
# 使用方法: ./deploy-auto.sh [static|node|docker]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "检测到 root 用户，建议使用普通用户运行此脚本"
        read -p "是否继续? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# 检查系统类型
check_system() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            SYSTEM="debian"
            PKG_MANAGER="apt"
        elif [ -f /etc/redhat-release ]; then
            SYSTEM="redhat"
            PKG_MANAGER="yum"
        else
            log_error "不支持的 Linux 发行版"
            exit 1
        fi
    else
        log_error "不支持的操作系统: $OSTYPE"
        exit 1
    fi
    log_info "检测到系统: $SYSTEM"
}

# 安装基础依赖
install_dependencies() {
    log_info "安装基础依赖..."
    
    if [ "$SYSTEM" = "debian" ]; then
        sudo apt update
        sudo apt install -y curl wget git nginx nodejs npm
    elif [ "$SYSTEM" = "redhat" ]; then
        sudo yum update -y
        sudo yum install -y curl wget git nginx nodejs npm
    fi
    
    # 安装最新版本的 Node.js
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo $PKG_MANAGER install -y nodejs
    
    log_success "基础依赖安装完成"
}

# 创建项目目录
setup_project_directory() {
    PROJECT_DIR="/var/www/bay-area-credit-platform"
    log_info "创建项目目录: $PROJECT_DIR"
    
    sudo mkdir -p $PROJECT_DIR
    sudo chown -R $USER:$USER $PROJECT_DIR
    
    log_success "项目目录创建完成"
}

# 部署静态文件版本
deploy_static() {
    log_info "开始静态文件部署..."
    
    # 构建项目
    log_info "构建项目..."
    npm install
    npm run build
    
    # 复制文件到 nginx 目录
    sudo cp -r dist/* $PROJECT_DIR/
    
    # 配置 Nginx
    log_info "配置 Nginx..."
    sudo cp nginx-static.conf /etc/nginx/sites-available/bay-area-credit-platform
    sudo ln -sf /etc/nginx/sites-available/bay-area-credit-platform /etc/nginx/sites-enabled/
    
    # 删除默认配置
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # 测试配置
    sudo nginx -t
    
    # 重启 Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    log_success "静态文件部署完成"
}

# 部署 Node.js 版本
deploy_node() {
    log_info "开始 Node.js 部署..."
    
    # 安装 PM2
    sudo npm install -g pm2
    
    # 构建项目
    log_info "构建项目..."
    npm install
    npm run build
    
    # 复制项目文件
    cp -r . $PROJECT_DIR/
    cd $PROJECT_DIR
    
    # 启动应用
    pm2 start ecosystem.config.js --env production
    pm2 save
    pm2 startup
    
    # 配置 Nginx 反向代理
    log_info "配置 Nginx 反向代理..."
    sudo cp nginx-proxy.conf /etc/nginx/sites-available/bay-area-credit-platform
    sudo ln -sf /etc/nginx/sites-available/bay-area-credit-platform /etc/nginx/sites-enabled/
    
    # 删除默认配置
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # 测试配置
    sudo nginx -t
    
    # 重启 Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    log_success "Node.js 部署完成"
}

# 部署 Docker 版本
deploy_docker() {
    log_info "开始 Docker 部署..."
    
    # 安装 Docker
    if ! command -v docker &> /dev/null; then
        log_info "安装 Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
    fi
    
    # 安装 Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_info "安装 Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    # 构建和启动容器
    docker-compose build
    docker-compose up -d
    
    log_success "Docker 部署完成"
}

# 配置防火墙
setup_firewall() {
    log_info "配置防火墙..."
    
    if command -v ufw &> /dev/null; then
        sudo ufw --force enable
        sudo ufw allow ssh
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        log_success "UFW 防火墙配置完成"
    elif command -v firewall-cmd &> /dev/null; then
        sudo systemctl start firewalld
        sudo systemctl enable firewalld
        sudo firewall-cmd --permanent --add-service=ssh
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
        log_success "Firewalld 防火墙配置完成"
    else
        log_warning "未找到防火墙工具，请手动配置"
    fi
}

# 配置 SSL 证书
setup_ssl() {
    read -p "是否配置 SSL 证书? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "请输入域名: " DOMAIN
        
        # 安装 Certbot
        if [ "$SYSTEM" = "debian" ]; then
            sudo apt install -y certbot python3-certbot-nginx
        elif [ "$SYSTEM" = "redhat" ]; then
            sudo yum install -y certbot python3-certbot-nginx
        fi
        
        # 获取证书
        sudo certbot --nginx -d $DOMAIN
        
        # 设置自动续期
        echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
        
        log_success "SSL 证书配置完成"
    fi
}

# 显示部署信息
show_deployment_info() {
    log_success "部署完成！"
    echo
    echo "==================================="
    echo "部署信息:"
    echo "==================================="
    echo "项目目录: $PROJECT_DIR"
    echo "Nginx 配置: /etc/nginx/sites-available/bay-area-credit-platform"
    echo "日志位置: /var/log/nginx/"
    echo
    echo "常用命令:"
    echo "查看 Nginx 状态: sudo systemctl status nginx"
    echo "重启 Nginx: sudo systemctl restart nginx"
    echo "查看日志: sudo tail -f /var/log/nginx/error.log"
    
    if [ "$DEPLOY_TYPE" = "node" ]; then
        echo "查看 PM2 状态: pm2 status"
        echo "查看应用日志: pm2 logs"
    elif [ "$DEPLOY_TYPE" = "docker" ]; then
        echo "查看容器状态: docker-compose ps"
        echo "查看容器日志: docker-compose logs -f"
    fi
    echo "==================================="
}

# 主函数
main() {
    log_info "粤港澳大湾区跨境征信服务平台 - 自动化部署脚本"
    
    DEPLOY_TYPE=${1:-"static"}
    
    case $DEPLOY_TYPE in
        "static")
            log_info "选择部署方式: 静态文件 + Nginx"
            ;;
        "node")
            log_info "选择部署方式: Node.js + PM2 + Nginx"
            ;;
        "docker")
            log_info "选择部署方式: Docker 容器化"
            ;;
        *)
            log_error "无效的部署方式: $DEPLOY_TYPE"
            echo "使用方法: $0 [static|node|docker]"
            exit 1
            ;;
    esac
    
    check_root
    check_system
    install_dependencies
    setup_project_directory
    
    case $DEPLOY_TYPE in
        "static")
            deploy_static
            ;;
        "node")
            deploy_node
            ;;
        "docker")
            deploy_docker
            ;;
    esac
    
    setup_firewall
    setup_ssl
    show_deployment_info
}

# 运行主函数
main "$@"
