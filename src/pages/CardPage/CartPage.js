import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Kullanıcının ID'sini al (Bunu giriş yapmış kullanıcıdan çekmelisin)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Sepet verileri alınırken hata oluştu", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${userId}/remove/${productId}`);
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Ürün sepetten silinirken hata oluştu", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Ödeme sayfasına yönlendir
  };

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.cartContainer}>
      <Typography variant="h4" className={styles.header}>Sepetiniz</Typography>
      
      {cartItems.length === 0 ? (
        <Typography className={styles.emptyCart}>Sepetiniz boş.</Typography>
      ) : (
        <Box className={styles.cartItems}>
          {cartItems.map((item) => (
            <Paper key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.productImage} />
              <Box className={styles.itemInfo}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">{item.price} TL</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id)}>Kaldır</Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {cartItems.length > 0 && (
        <Button variant="contained" color="primary" className={styles.checkoutButton} onClick={handleCheckout}>
          Satın Al
        </Button>
      )}
    </Box>
  );
};

export default CartPage;
