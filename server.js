import express from 'express';
import pkg from 'sqlite3';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const sqlite3 = pkg.verbose();
const db = new sqlite3.Database('loja.db');

const app = express();

app.use(cors());
app.use(express.json());

// Criação das tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT,
    description TEXT,
    category TEXT,
    benefits TEXT,
    stock INTEGER DEFAULT 0,
    expiry_date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    endereco TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    produtos TEXT NOT NULL,
    status TEXT DEFAULT 'pendente',
    data_pedido TEXT DEFAULT (datetime('now','localtime')),
    confirmado INTEGER DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  )`);
});

// Rotas produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/produtos', (req, res) => {
  const { name, price, image, description, category, benefits, stock, expiry_date } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Name e price são obrigatórios.' });

  const sql = `INSERT INTO produtos (name, price, image, description, category, benefits, stock, expiry_date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [name, price, image, description, category, benefits, stock || 0, expiry_date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, price, image, description, category, benefits, stock, expiry_date });
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, image, description, category, benefits, stock, expiry_date } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Name e price são obrigatórios.' });

  const sql = `UPDATE produtos SET name = ?, price = ?, image = ?, description = ?, category = ?, benefits = ?, stock = ?, expiry_date = ? WHERE id = ?`;
  db.run(sql, [name, price, image, description, category, benefits, stock || 0, expiry_date, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ id: Number(id), name, price, image, description, category, benefits, stock, expiry_date });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto excluído com sucesso.' });
  });
});

// Rotas clientes
app.get('/clientes', (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(row);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, telefone, email, endereco } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  const sql = `INSERT INTO clientes (nome, telefone, email, endereco) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nome, telefone, email, endereco], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nome, telefone, email, endereco });
  });
});

app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, endereco } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  const sql = `UPDATE clientes SET nome = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?`;
  db.run(sql, [nome, telefone, email, endereco, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ id: Number(id), nome, telefone, email, endereco });
  });
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ message: 'Cliente excluído com sucesso' });
  });
});

// Rotas pedidos
app.get('/pedidos', (req, res) => {
  db.all('SELECT * FROM pedidos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM pedidos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(row);
  });
});

app.post('/pedidos', (req, res) => {
  const { cliente_id, produtos, status, confirmado } = req.body;
  if (!cliente_id || !produtos) return res.status(400).json({ error: 'cliente_id e produtos são obrigatórios' });

  const sql = `INSERT INTO pedidos (cliente_id, produtos, status, data_pedido, confirmado)
               VALUES (?, ?, ?, datetime('now','localtime'), ?)`;
  db.run(sql, [cliente_id, JSON.stringify(produtos), status || 'pendente', confirmado ? 1 : 0], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, cliente_id, produtos, status, confirmado });
  });
});

app.put('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const { cliente_id, produtos, status, confirmado } = req.body;
  if (!cliente_id || !produtos) return res.status(400).json({ error: 'cliente_id e produtos são obrigatórios' });

  const sql = `UPDATE pedidos SET cliente_id = ?, produtos = ?, status = ?, confirmado = ? WHERE id = ?`;
  db.run(sql, [cliente_id, JSON.stringify(produtos), status, confirmado ? 1 : 0, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({ id: Number(id), cliente_id, produtos, status, confirmado });
  });
});

app.delete('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM pedidos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({ message: 'Pedido excluído com sucesso' });
  });
});

// Rota raiz redirecionando para frontend
app.get('/', (req, res) => {
  res.redirect('http://localhost:5173/login');
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});