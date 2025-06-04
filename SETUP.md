# 项目设置指南

## 📋 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🚀 快速开始

### 1. 安装前端依赖

```bash
# 在项目根目录
npm install
```

### 2. 安装后端依赖

```bash
# 进入服务器目录
cd sever
npm install
```

### 3. 启动开发环境

#### 启动前端开发服务器
```bash
# 在项目根目录
npm run dev
```
前端将在 `http://localhost:5173` 运行

#### 启动后端服务器
```bash
# 在sever目录
cd sever
node server.js
```
后端将在 `http://localhost:3000` 运行

## 📁 目录说明

```
├── src/                    # 前端源代码
│   ├── components/         # Vue组件
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── api/               # API接口
│   ├── utils/             # 工具函数
│   ├── assets/            # 静态资源
│   └── styles/            # 样式文件
├── sever/                 # 后端代码
│   ├── server.js          # Express服务器
│   ├── package.json       # 后端依赖
│   └── package-lock.json  # 后端锁定文件
├── public/                # 公共静态资源
├── dist/                  # 构建输出（自动生成）
└── node_modules/          # 前端依赖（自动生成）
```

## 🛠️ 开发命令

### 前端
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
```

### 后端
```bash
cd sever
node server.js   # 启动后端服务器
```

## 📝 注意事项

1. 确保前后端都正确安装了依赖
2. 开发时需要同时启动前端和后端服务
3. 构建前端时会生成 `dist` 目录
4. `node_modules` 目录不应提交到版本控制

## 🔧 常见问题

### 依赖安装失败
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 端口冲突
- 前端默认端口：5173
- 后端默认端口：3000
- 如有冲突，请修改相应配置文件
