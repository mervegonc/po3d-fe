import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png"; // Logo için uygun bir görsel koy

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Çömlek Dükkanı" className={styles.logo} />
        <span className={styles.brandName}>Po3D Çömlek Dükkanı</span>
      </div>

      {/* Menü Linkleri */}
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/model">Models</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      {/* Arama ve Login Butonu */}
      <div className={styles.rightMenu}>
        <input type="text" placeholder="Search..." className={styles.searchBar} />
        <Link to="/login" className={styles.loginButton}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
