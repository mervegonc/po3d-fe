import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProductPage.module.css";

const products = [
  { id: 1, name: "Yeşil Kupa", price: "₺250", image: require("../../assets/products/1.jpg") },
  { id: 2, name: "Krem ve Siyah Kupa", price: "₺280", image: require("../../assets/products/2.jpg") },
  { id: 3, name: "Sarı Kupa", price: "₺230", image: require("../../assets/products/3.jpg") },
  { id: 4, name: "Pembe Çaydanlık", price: "₺450", image: require("../../assets/products/4.jpg") },
  { id: 5, name: "Bej ve Yeşil Kupa", price: "₺260", image: require("../../assets/products/6.jpg") },
  { id: 6, name: "Yeşil Saplı Kupa", price: "₺275", image: require("../../assets/products/7.jpg") }
];

const ProductPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
