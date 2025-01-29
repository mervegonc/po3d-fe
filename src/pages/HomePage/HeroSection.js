import React from "react";
import styles from "./HeroSection.module.css";
import heroImage from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img src={heroImage} alt="Çömlek Sanatı" className={styles.heroImage} />
      <div className={styles.heroContent}>
        <h1>El Yapımı Çömlek Sanatını Keşfedin</h1>
        <p>
          Özgün tasarımlarımızla çay ve kahve keyfinize estetik bir dokunuş katın.
          Şimdi keşfedin ve kendi özel tasarımınızı oluşturun!
        </p>
        <a href="/product" className={styles.ctaButton}>Keşfet</a>
      </div>
    </header>
  );
};

export default HeroSection;
