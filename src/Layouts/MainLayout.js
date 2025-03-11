import React from "react";
import Footer from "../components/Footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
    
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
