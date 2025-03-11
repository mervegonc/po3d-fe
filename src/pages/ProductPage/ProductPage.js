import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios/AxiosInstance";
import styles from "./ProductPage.module.css";
import EditIcon from "@mui/icons-material/Edit";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const backendURL = "http://localhost:8080/api/products/image/";

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosInstance.get("/products");
        const productsWithImages = response.data.map((product) => ({
          ...product,
          imageUrl:
            product.images.length > 0
              ? `${backendURL}${product.images[0].split("/").pop()}`
              : "https://via.placeholder.com/150",
        }));
        setProducts(productsWithImages);
      } catch (err) {
        console.error("Ürünleri çekerken hata oluştu:", err);
        setError("Ürünleri yüklerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditRedirect = (productId) => {
    if (isAdmin) {
      navigate(`/edit-product/${productId}`);
    }
  };

  return (
    <div>
    
      <div className={styles.container}>

        {loading && <p className={styles.loading}>Yükleniyor...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.productList}>
          {products.length === 0 && !loading && !error && (
            <p className={styles.noProducts}>Henüz ürün eklenmemiş.</p>
          )}

          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              {/* Eğer adminse sağ üst köşeye Edit iconu ekle */}
              {isAdmin && (
                <EditIcon
                  className={styles.editIcon}
                  onClick={() => handleEditRedirect(product.id)}
                />
              )}

              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage}
              />
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productPrice}>{product.price} ₺</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
