import React from "react";
import styles from "./HelpPage.module.css";

const HelpPage = () => {
  return (
    <div className={styles.helpC}>
       
    <div className={styles.container}>
      <h1 className={styles.title}>Yardım Merkezi</h1>
      <p className={styles.description}>Aşağıda sıkça sorulan soruların cevaplarını bulabilirsiniz.</p>
      
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Sıkça Sorulan Sorular</h2>
        <div className={styles.faqItem}>
          <h3>PO3D'de nasıl hesap oluşturabilirim?</h3>
          <p>Kayıt sayfasına giderek e-posta ve şifreniz ile kolayca hesap oluşturabilirsiniz.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>3D model nasıl seçilir ve özelleştirilir?</h3>
          <p>Ana ekranda bulunan 3D modeller arasından seçim yapabilir ve boyut, kulp, desen gibi özellikleri değiştirebilirsiniz.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Ödeme işlemi nasıl gerçekleşiyor?</h3>
          <p>Sepete eklediğiniz ürünleri ödeme ekranında Shopier üzerinden güvenli bir şekilde satın alabilirsiniz.</p>
        </div>
      </div>

      <div className={styles.supportSection}>
        <h2 className={styles.supportTitle}>Daha Fazla Yardım mı Gerekiyor?</h2>
        <p>Bizimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz:</p>
        <ul>
          <li><strong>E-posta:</strong> destek@po3d.com</li>
          <li><strong>WhatsApp:</strong> +90 123 456 78 90</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default HelpPage;
