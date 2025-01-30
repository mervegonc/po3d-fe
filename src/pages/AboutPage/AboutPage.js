import React from "react";
import styles from "./AboutPage.module.css";
import aboutImage from "../../assets/images/about-image.jpg"; 
import Navbar from "../../components/Navbar/Navbar";

const AboutPage = () => {
  return (
    <div className={styles.AboutC}>
      <Navbar />
      <div className={styles.container}>
        {/* Arkaplan resmi */}
        <div className={styles.imageContainer}>
          <img src={aboutImage} alt="PO3D Hakkımızda" className={styles.image} />

          {/* Üstüne gelen yazılar */}
          <div className={styles.overlay}>
            <h1 className={styles.title}>Hakkımızda</h1>
            <p className={styles.description}>
              PO3D, kullanıcıların kendi benzersiz seramik tasarımlarını oluşturmasına ve kişiselleştirilmiş 3D modellerle özel ürünler satın almasına olanak tanıyan yenilikçi bir platformdur.
            </p>
            <p className={styles.text}>
              Web sitemizde, farklı <strong>kulp, ağız, boyut ve desen</strong> seçenekleriyle kendi tasarımınızı yapabilir, gerçek zamanlı olarak görüntüleyebilir ve beğendiğiniz modeli sipariş edebilirsiniz.
            </p>
            <p className={styles.text}>
              Amacımız, <strong>sanatı ve teknolojiyi</strong> birleştirerek kullanıcılarımıza <strong>özelleştirilmiş seramik deneyimi</strong> sunmak ve hayal ettikleri tasarımları gerçeğe dönüştürmelerine yardımcı olmaktır.
            </p>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default AboutPage;
