# 🚀 粤港澳大湾区信用平台 - 生产环境部署指南

## 📋 快速开始

### 方案一：最简单部署（推荐）

#### Windows 系统
1. 下载项目代码到展示机器
2. 安装 [Node.js](https://nodejs.org/) (版本 16 或以上)
3. 双击运行 `deploy-simple.bat`
4. 等待构建完成，浏览器访问 `http://localhost:3000`

#### Mac/Linux 系统
```bash
# 1. 下载项目代码
git clone https://github.com/Jokersama2021/greater-bay-area-credit-platform.git
cd greater-bay-area-credit-platform

# 2. 运行部署脚本
./deploy-simple.sh

# 3. 访问 http://localhost:3000
```

### 方案二：Docker 部署（推荐生产环境）

```bash
# 1. 安装 Docker 和 Docker Compose

# 2. 构建并启动
docker-compose up -d

# 3. 访问 http://localhost:3000
```

### 方案三：手动部署

```bash
# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 启动服务
npx serve -s dist -l 3000
```

## 🔧 自定义配置

### 修改端口
```bash
# 方法1：使用脚本参数
./deploy-simple.sh 8080

# 方法2：直接指定
npx serve -s dist -l 8080

# 方法3：Docker
# 修改 docker-compose.yml 中的端口映射
ports:
  - "8080:80"
```

### 配置域名访问
1. 配置 DNS 解析
2. 使用 Nginx 反向代理
3. 配置 SSL 证书（可选）

## 📁 文件说明

- `deploy-simple.sh` - Linux/Mac 一键部署脚本
- `deploy-simple.bat` - Windows 一键部署脚本
- `Dockerfile` - Docker 镜像构建文件
- `docker-compose.yml` - Docker Compose 配置
- `nginx-docker.conf` - Nginx 配置文件

## 🛠️ 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   lsof -i :3000  # Mac/Linux
   netstat -ano | findstr :3000  # Windows
   
   # 使用其他端口
   ./deploy-simple.sh 8080
   ```

2. **构建失败**
   ```bash
   # 清理缓存重试
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **访问白屏**
   - 检查浏览器控制台错误
   - 确认服务正常启动
   - 检查防火墙设置

### 性能优化

1. **启用 Gzip 压缩**（Docker 部署已包含）
2. **配置 CDN**（可选）
3. **使用 HTTPS**（生产环境推荐）

## 📞 技术支持

如遇到部署问题，请检查：
1. Node.js 版本是否 >= 16
2. 网络连接是否正常
3. 端口是否被占用
4. 防火墙设置是否正确

## 🔄 更新部署

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重新部署
./deploy-simple.sh

# Docker 方式
docker-compose down
docker-compose up -d --build
```
