import React from "react";

import styles from "./HomePage.module.css";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <div className={styles.container}>
    
      <HeroSection />

      {/* İçerik Bölümü */}
      <section className={styles.content}>
        <h2>Gelenekten Geleceğe: Çömlek Sanatının Yeni Yüzü</h2>
        <p>
          Çömlek Dükkanı, modern ve geleneksel el sanatlarını birleştirerek özel tasarım 
          kupalar, fincanlar, tabaklar ve seramik anahtarlıklar üretiyor. 
          Her ürünümüz el emeğiyle hazırlanmış olup, estetik ve fonksiyonelliği bir araya getiriyor.  
          <br /><br />
          <strong>🛍️ Özel Siparişler ve Kişiselleştirme</strong>  
          <br />
          Sevdiklerinize anlamlı ve özel hediyeler sunmak için kişiselleştirilmiş çömlek 
          seçeneklerimizi keşfedin. İstediğiniz deseni, yazıyı veya şekli seçerek kendi
          ürününüzü tasarlayın.  
          <br /><br />
          <strong>🌿 Doğaya Saygılı Üretim</strong>  
          <br />
          Ürünlerimiz doğal malzemelerle üretilmiş olup, sürdürülebilir ve çevre dostudur.
          Doğanın güzelliğini ve sadeliğini yansıtan ürünlerimizle tanışın.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
