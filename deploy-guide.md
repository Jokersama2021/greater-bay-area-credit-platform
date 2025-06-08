# 🚀 粤港澳大湾区跨境征信服务平台 - 云服务器部署指南

## 📋 服务器配置要求

### 最低配置
- **CPU**: 1核
- **内存**: 1GB RAM  
- **存储**: 20GB SSD
- **带宽**: 1Mbps
- **操作系统**: Ubuntu 20.04 LTS / CentOS 7+ / Debian 10+

### 推荐配置
- **CPU**: 2核
- **内存**: 2GB RAM
- **存储**: 40GB SSD  
- **带宽**: 5Mbps
- **操作系统**: Ubuntu 22.04 LTS

## 🛠️ 部署方案

### 方案一：Nginx + 静态文件部署（推荐）

#### 1. 服务器环境准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install -y nginx nodejs npm git curl

# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
nginx -v
```

#### 2. 项目部署

```bash
# 创建项目目录
sudo mkdir -p /var/www/bay-area-credit-platform
sudo chown -R $USER:$USER /var/www/bay-area-credit-platform

# 克隆项目（或上传项目文件）
cd /var/www/bay-area-credit-platform
git clone <你的仓库地址> .

# 安装依赖
npm install

# 构建项目
npm run build

# 将构建文件移动到 nginx 目录
sudo cp -r dist/* /var/www/bay-area-credit-platform/
```

#### 3. Nginx 配置

```bash
# 创建 Nginx 配置文件
sudo nano /etc/nginx/sites-available/bay-area-credit-platform
```

#### 4. 启动服务

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/bay-area-credit-platform /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

### 方案二：Node.js + Express 服务器

#### 1. 安装 PM2

```bash
# 全局安装 PM2
sudo npm install -g pm2

# 验证安装
pm2 --version
```

#### 2. 部署项目

```bash
# 进入项目目录
cd /var/www/bay-area-credit-platform

# 构建项目
npm run build

# 使用 PM2 启动应用
pm2 start ecosystem.config.js --env production

# 保存 PM2 配置
pm2 save
pm2 startup
```

#### 3. 配置反向代理

```bash
# 创建 Nginx 反向代理配置
sudo nano /etc/nginx/sites-available/bay-area-credit-platform-proxy
```

### 方案三：Docker 容器化部署

#### 1. 安装 Docker

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker --version
docker-compose --version
```

## 🔒 安全配置

### 1. 防火墙设置

```bash
# 启用 UFW 防火墙
sudo ufw enable

# 允许必要端口
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 检查状态
sudo ufw status
```

### 2. SSL 证书配置

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com

# 设置自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 监控和维护

### 1. 日志监控

```bash
# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 查看 PM2 日志
pm2 logs

# 查看系统资源
htop
df -h
free -h
```

### 2. 性能优化

```bash
# 启用 Nginx Gzip 压缩
sudo nano /etc/nginx/nginx.conf

# 配置缓存策略
# 在 nginx 配置中添加缓存头
```

## 🚀 自动化部署脚本

创建自动化部署脚本，简化部署流程。

## 📱 域名和DNS配置

1. 购买域名
2. 配置 DNS 解析
3. 设置 A 记录指向服务器 IP
4. 配置 SSL 证书

## 🔧 故障排除

### 常见问题解决方案

1. **端口被占用**
2. **权限问题**  
3. **内存不足**
4. **网络连接问题**

## 📈 性能监控

建议使用以下工具监控服务器性能：
- Nginx 状态监控
- PM2 监控面板
- 系统资源监控
- 应用性能监控
