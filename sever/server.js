const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// 使用express内置的body-parser中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'financial_data'
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API endpoint for user registration
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing username, email, or password" });
  }

  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 10);

  // 查询用户名是否已存在
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(query, [username, email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    if (results.length > 0) {
      return res.json({ success: false, message: "Username or email already exists" });
    }

    // 存储新用户信息
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error", error: err.message });
      }
      res.json({ success: true, message: "User registered successfully" });
    });
  });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    if (results.length === 0) {
      return res.json({ success: false, message: "Username does not exist" });
    }

    // 验证密码
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Password is incorrect" });
    }
  });
});

// 提交交易详情到数据库
app.post('/api/submitTransaction', async (req, res) => {
  const {
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  } = req.body;

  const insertQuery = `INSERT INTO companies_data_fabric (
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertQuery, [
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    res.json({ success: true, message: "Transaction data submitted successfully" });
  });
});

// API endpoint to submit transaction details to the 'companies_data_bcos' table
app.post('/api/submitTransaction2', async (req, res) => {
  const {
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  } = req.body;

  const insertQuery = `INSERT INTO companies_data_bcos (
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertQuery, [
    company_name, tx_hash, username, tx_id, block_number, path, method,
    xa_transaction_id, xa_transaction_seq, by_proxy, error_code, message,
    properties_path, properties_username, properties_block_number, properties_tx_hash,
    properties_xa_transaction_id, properties_xa_transaction_seq, properties_method,
    properties_args, properties_result, properties_by_proxy, properties_error_code,
    properties_message
  ], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    res.json({ success: true, message: "Transaction data submitted successfully to BCoS" });
  });
});

// API endpoint to fetch company details by stock name
app.get('/api/company-details/:company_name', (req, res) => {
  const { company_name } = req.params;
  const query = 'SELECT * FROM companies_data_bcos WHERE company_name = ?';
  db.query(query, [company_name], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
    if (results.length === 0) {
      return res.json({ success: false, message: "No records found for the given company_name" });
    }
    res.json({ success: true, data: results, message: "Data retrieved successfully" });
  });
});



const data1 = require("./data1")
const data2 = require("./data2")
const data3 = require("./data3")
// API endpoint to get visualization data based on user-selected table
app.get('/api/visualization/:table?', (req, res) => {
  const tableName = req.params.table || 'table1';
  tableName ==  'table1' && res.json({ success: true, code: 200, message: 'Data fetched successfully', data: { [tableName]: [data1] } });
  tableName ==  'table2' && res.json({ success: true, code: 200, message: 'Data fetched successfully', data: { [tableName]: [data2] } });
  tableName ==  'table3' && res.json({ success: true, code: 200, message: 'Data fetched successfully', data: { [tableName]: [data3] } });
  // const query = `SELECT * FROM ${db.escapeId(tableName)}`;
  // db.query(query, (err, results) => {
  //   if (err) {
  //     return res.status(500).send({ success: false, code: 500, message: 'Internal server error', error: err.message });
  //   }
  //   const responseData = { [tableName]: results };
  //   res.json({ success: true, code: 200, message: 'Data fetched successfully', data: responseData });
  // });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
