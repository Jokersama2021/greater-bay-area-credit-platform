# 生产环境部署指南

## 方案一：静态文件部署（推荐）

### 1. 构建生产版本
```bash
# 在开发机器上构建
npm run build
```

### 2. 部署到展示机器
将 `dist` 文件夹复制到展示机器，然后选择以下任一方式：

#### 方式A：使用 Node.js 简单服务器
```bash
# 安装 serve（全局安装一次即可）
npm install -g serve

# 启动服务（在 dist 文件夹所在目录）
serve -s dist -l 3000
```

#### 方式B：使用 Python 简单服务器
```bash
# Python 3
cd dist
python -m http.server 3000

# Python 2
cd dist
python -m SimpleHTTPServer 3000
```

#### 方式C：使用 Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 方案二：Docker 部署

### 1. 创建 Dockerfile
```dockerfile
# 多阶段构建
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产环境
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建 nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### 3. 构建和运行
```bash
# 构建镜像
docker build -t credit-platform .

# 运行容器
docker run -d -p 3000:80 credit-platform
```

## 方案三：一键部署脚本

### Windows 部署脚本 (deploy-windows.bat)
```batch
@echo off
echo 正在构建生产版本...
call npm run build

echo 正在启动服务器...
call npx serve -s dist -l 3000

echo 服务已启动，访问地址: http://localhost:3000
pause
```

### Linux/Mac 部署脚本 (deploy.sh)
```bash
#!/bin/bash
echo "正在构建生产版本..."
npm run build

echo "正在启动服务器..."
npx serve -s dist -l 3000
```

## 推荐配置

### 1. 最简单方式（推荐新手）
1. 在开发机器运行 `npm run build`
2. 将生成的 `dist` 文件夹复制到展示机器
3. 在展示机器安装 Node.js
4. 运行 `npx serve -s dist -l 3000`

### 2. 性能最佳方式（推荐生产）
使用 Nginx 部署，配置缓存和压缩

### 3. 最便携方式
使用 Docker，一次构建到处运行

## 注意事项

1. **端口配置**：默认使用 3000 端口，可根据需要修改
2. **防火墙**：确保展示机器的端口已开放
3. **域名配置**：如需域名访问，配置相应的 DNS 和反向代理
4. **HTTPS**：生产环境建议配置 SSL 证书
5. **自动启动**：可配置系统服务实现开机自启

## 性能优化建议

1. 启用 Gzip 压缩
2. 配置静态资源缓存
3. 使用 CDN 加速
4. 启用 HTTP/2
