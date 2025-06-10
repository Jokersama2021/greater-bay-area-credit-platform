const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 静态文件服務
app.use(express.static(path.join(__dirname, 'dist')));

// 處理 SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启動服務器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 服務器运行在: http://localhost:${PORT}`);
  console.log(`🌐 網絡访問地址: http://你的IP地址:${PORT}`);
  console.log(`📱 移動端访問: http://你的IP地址:${PORT}`);
});

// 優雅關闭
process.on('SIGTERM', () => {
  console.log('服務器正在關闭...');
  process.exit(0);
});
