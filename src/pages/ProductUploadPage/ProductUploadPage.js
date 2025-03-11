import { useState, useEffect } from "react";
import AxiosInstance from "../../axios/AxiosInstance";
import DragDropUploader from "./DragDropUploader";

import styles from "./ProductUploadPage.module.css";

const ProductUploadPage = () => {
  const [products, setProducts] = useState([]); // Ürünleri listelemek için
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // **Tüm ürünleri GET isteği ile çek**
  const fetchProducts = async () => {
    try {
      const response = await AxiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Ürünleri alırken hata oluştu:", error);
    }
  };

  // **Dosya seçme işlemi**
  const handleFileSelect = (file) => {
    setImages([file]);
  };

  // **Formu sıfırla**
  const resetForm = () => {
    setProductName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setStock("");
    setImages([]);
    setSelectedImage(null);
    setIsEditing(false);
    setEditProductId(null);
  };

  // **Yeni ürün yükleme (POST)**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!productName || !description || !category || !price || !stock || images.length === 0) {
      setMessage("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", images[0]); // İlk resmi gönderiyoruz

    try {
      await AxiosInstance.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Ürün başarıyla yüklendi!");
      resetForm();
      fetchProducts(); // Ürünleri tekrar yükle
    } catch (error) {
      setMessage("Ürün yüklenirken hata oluştu.");
      console.error("Error uploading product:", error);
    } finally {
      setLoading(false);
    }
  };

  // **Ürünü Güncelleme (PUT)**
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!productName || !description || !category || !price || !stock) {
      setMessage("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }

    const updateData = {
      productName,
      description,
      category,
      price,
      stock,
    };

    try {
      await AxiosInstance.put(`/products/${editProductId}`, updateData);
      setMessage("Ürün başarıyla güncellendi!");
      resetForm();
      fetchProducts();
    } catch (error) {
      setMessage("Ürün güncellenirken hata oluştu.");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  // **Ürünü Silme (DELETE)**
  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/products/${id}`);
      setMessage("Ürün başarıyla silindi!");
      fetchProducts(); // Güncellenmiş listeyi çek
    } catch (error) {
      setMessage("Ürün silinirken hata oluştu.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.container}>
    
      <div className={styles.uploadBox}>
        <h2 className={styles.title}>{isEditing ? "Ürün Güncelle" : "Ürün Yükle"}</h2>
        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={isEditing ? handleUpdate : handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Ürün Adı"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="text"
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Fiyat (₺)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Stok Miktarı"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={styles.input}
          />

          {!isEditing && <DragDropUploader onFileSelect={handleFileSelect} className={styles.dragDrop} />}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Yükleniyor..." : isEditing ? "Ürünü Güncelle" : "Ürünü Yükle"}
          </button>
        </form>

        <h2 className={styles.title}>Ürünler</h2>
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Kategori: {product.category}</p>
              <p>Fiyat: {product.price}₺</p>
              <p>Stok: {product.stock}</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditProductId(product.id);
                  setProductName(product.name);
                  setDescription(product.description);
                  setCategory(product.category);
                  setPrice(product.price);
                  setStock(product.stock);
                }}
                className={styles.editButton}
              >
                Düzenle
              </button>
              <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductUploadPage;
