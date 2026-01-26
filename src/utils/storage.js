// src/utils/storage.js

// ====== USUÁRIOS ======
export const getUsers = () => {
  const users = localStorage.getItem('verdeNature_users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem('verdeNature_users', JSON.stringify(users));
};

export const addUser = (user) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

// ====== ADMIN ======
export const getAdmin = () => {
  const admin = localStorage.getItem('verdeNature_admin');
  if (admin) return JSON.parse(admin);
  
  // Admin padrão se não existir
  const defaultAdmin = {
    id: 1,
    name: 'Administrador',
    email: 'admin@verdenature.com',
    password: 'admin123',
    role: 'admin'
  };
  localStorage.setItem('verdeNature_admin', JSON.stringify(defaultAdmin));
  return defaultAdmin;
};

// ====== PRODUTOS (ESTOQUE) ======
export const getProducts = () => {
  const products = localStorage.getItem('verdeNature_products');
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products) => {
  localStorage.setItem('verdeNature_products', JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    saveProducts(products);
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

// ====== PEDIDOS ======
export const getOrders = () => {
  const orders = localStorage.getItem('verdeNature_orders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders) => {
  localStorage.setItem('verdeNature_orders', JSON.stringify(orders));
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: Date.now(),
    status: 'pendente',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    saveOrders(orders);
    return orders[index];
  }
  return null;
};

// ====== SESSÃO (USUÁRIO LOGADO) ======
export const getCurrentUser = () => {
  const user = localStorage.getItem('verdeNature_currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('verdeNature_currentUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('verdeNature_currentUser');
};