import React, { useEffect } from 'react';
import "./index.css";  // index.css dosyanın dahil olduğundan emin ol
import Navbar from "./components/Navbar/Navbar";  // Navbar import edildi
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModelSelectionPage from './pages/ModelSelectionPage/ModelSelectionPage';
import AuthPage from './pages/LoginPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import HelpPage from './pages/HelpPage/HelpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CartPage from './pages/CardPage/CartPage';
import ProductUploadPage from './pages/ProductUploadPage/ProductUploadPage';
import AxiosInstance from './axios/AxiosInstance';
import ProductEdit from "./pages/ProductEdit/ProductEdit.js"
function App() {

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}, []);



  return (
    <Router>
            <Navbar /> {}
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/edit-product/:productId" element={<ProductEdit />} />
        <Route path="/model" element={<ModelSelectionPage />} />
        <Route path="/productupload" element={<ProductUploadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
