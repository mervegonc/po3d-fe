import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import Navbar from "../../components/Navbar/Navbar";

const AuthPage = () => {
  const [page, setPage] = useState("signin"); // "signin", "signup", "forgotpassword"
  const [formData, setFormData] = useState({
    name: "",
    usernameOrEmail: "",
    email: "",
    password: "",
    passwordReminder: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Input Değerlerini Güncelle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Gönderme İşlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      let response;
      if (page === "signin") {
        response = await axios.post("http://localhost:8080/api/auth/signin", {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.userId);
        navigate(`/user/${response.data.userId}`);
      } else if (page === "signup") {
        await axios.post("http://localhost:8080/api/auth/signup", formData);
        setSuccessMessage("Başarıyla kayıt oldunuz! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => setPage("signin"), 3000);
      } else if (page === "forgotpassword") {
        await axios.post("http://localhost:8080/api/auth/forgotpassword", {
          usernameOrEmail: formData.usernameOrEmail,
          passwordReminder: formData.passwordReminder,
          password: formData.password,
        });
        setSuccessMessage("Şifreniz başarıyla değiştirildi! Giriş yapabilirsiniz.");
        setTimeout(() => setPage("signin"), 3000);
      }
    } catch (err) {
      setError("Bir hata oluştu, bilgilerinizi kontrol edin!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.authContainer}>
        <Paper elevation={5} className={styles.authPaper}>
          <Typography className={styles.authTitle}>
            {page === "signup" ? "Kayıt Ol" : page === "forgotpassword" ? "Şifreyi Sıfırla" : "Giriş Yap"}
          </Typography>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {page === "signup" && (
              <TextField
                fullWidth
                label="Ad Soyad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            )}

            <TextField
              fullWidth
              label="E-posta veya Kullanıcı Adı"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={styles.inputField}
              required
            />

            {page === "signup" && (
              <TextField
                fullWidth
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            )}

            {page === "forgotpassword" && (
              <TextField
                fullWidth
                label="Hatırlatma Kelimesi"
                name="passwordReminder"
                value={formData.passwordReminder}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            )}

            <TextField
              fullWidth
              label="Şifre"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
              required
            />

            <Button type="submit" variant="contained" className={styles.submitButton} fullWidth>
              {page === "signup" ? "Kayıt Ol" : page === "forgotpassword" ? "Şifreyi Sıfırla" : "Giriş Yap"}
            </Button>

            {error && <Typography className={styles.errorMessage}>{error}</Typography>}
            {successMessage && <Typography className={styles.successMessage}>{successMessage}</Typography>}

            <div className={styles.authSwitchContainer}>
              {page !== "forgotpassword" && (
                <Typography>
                  {page === "signup" ? "Zaten bir hesabın var mı?" : "Hesabın yok mu?"}{" "}
                  <Button className={styles.authSwitchButton} onClick={() => setPage(page === "signup" ? "signin" : "signup")}>
                    {page === "signup" ? "Giriş Yap" : "Ücretsiz Kayıt Ol"}
                  </Button>
                </Typography>
              )}

              {page !== "forgotpassword" ? (
                <Button variant="text" className={styles.forgotPasswordButton} fullWidth onClick={() => setPage("forgotpassword")}>
                  Şifremi Unuttum
                </Button>
              ) : (
                <Button variant="text" className={styles.backButton} fullWidth onClick={() => setPage("signin")}>
                  Giriş Yap
                </Button>
              )}
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AuthPage;
