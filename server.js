const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// 处理 SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 服务器运行在: http://localhost:${PORT}`);
  console.log(`🌐 网络访问地址: http://你的IP地址:${PORT}`);
  console.log(`📱 移动端访问: http://你的IP地址:${PORT}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('服务器正在关闭...');
  process.exit(0);
});
