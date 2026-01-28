import SeedProducts from './pages/admin/SeedProducts';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CreateOrder from './pages/admin/CreateOrder'; 

import Header from './components/Header';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminLogin from './pages/admin/AdminLogin';
import AdminOrders from './pages/admin/AdminOrders';
import Dashboard from './pages/admin/Dashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminProducts from './pages/admin/AdminProducts';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>

            {/* Rota raiz redireciona para home */}
            <Route path="/" element={<Navigate to="/Home" replace />} />

            {/* Rotas Públicas */}
            <Route path="/Home" element={<><Header /><Home /></>} />
            <Route path="/produto/:id" element={<><Header /><ProductDetails /></>} />
            <Route path="/cart" element={<><Header /><Cart /></>} />
            <Route path="/checkout" element={<><Header /><Checkout /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin/dashboard" element={
              <AdminRoute><Dashboard /></AdminRoute>
            } />
            <Route path="/admin/clients" element={
              <AdminRoute><AdminClients /></AdminRoute>
            } />
            <Route path="/admin/products" element={
              <AdminRoute><AdminProducts /></AdminRoute>
            } />
            <Route path="/admin/orders/create" element={
              <AdminRoute><CreateOrder /></AdminRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminRoute><AdminOrders /></AdminRoute>
            } />
            <Route path="/admin/seed" element={
              <AdminRoute><SeedProducts /></AdminRoute>
            } />

            {/* Rota para página não encontrada */}
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />

          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;