import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios/AxiosInstance";
import styles from "./ProductEdit.module.css";
import { TextField, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";

const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const backendURL = "http://localhost:8080/api/products/image/";

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ROLE_ADMIN") {
      alert("Yetkiniz yok!");
      navigate("/product");
      return;
    }
    setIsAdmin(true);
  }, [navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosInstance.get(`/products/${productId}`);
        setProduct({
          ...response.data,
          imageUrl:
            response.data.images.length > 0
              ? `${backendURL}${response.data.images[0].split("/").pop()}`
              : "https://via.placeholder.com/150",
        });
        setEditedProduct(response.data);
      } catch (error) {
        console.error("Ürün yüklenirken hata oluştu:", error);
        alert("Ürün bulunamadı!");
        navigate("/product");
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await AxiosInstance.put(`/products/${productId}`, editedProduct);
      alert("Ürün başarıyla güncellendi!");
      navigate("/product");
    } catch (error) {
      console.error("Ürün güncellenirken hata oluştu:", error);
      alert("Güncelleme başarısız!");
    }
  };

  if (!product) {
    return <p className={styles.loading}>Yükleniyor...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.productCard}>
          <div className={styles.left}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          </div>
          <div className={styles.right}>
            <div className={styles.formGroup}>
              <TextField
                label="Ürün Adı"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                fullWidth
                className={styles.inputField}
              />
              <TextField
                label="Açıklama"
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                fullWidth
                className={styles.inputField}
              />
              <TextField
                label="Kategori"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                fullWidth
                className={styles.inputField}
              />
              <TextField
                label="Fiyat"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                fullWidth
                className={styles.inputField}
              />
              <TextField
                label="Stok"
                name="stock"
                value={editedProduct.stock}
                onChange={handleChange}
                fullWidth
                className={styles.inputField}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className={styles.saveButton}
            >
              Kaydet
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/product")}
              className={styles.backButton}
            >
              Geri Dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
