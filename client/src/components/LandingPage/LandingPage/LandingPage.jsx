import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Bienvenido a Nuestra Plataforma</h1>
        <p>Tu fuente de recetas deliciosas y saludables</p>
      </header>
      <div className={styles.mainContent}>
        <img
          src="https://cdn.shopify.com/s/files/1/0426/4978/0392/files/rsz_shutterstock_1658658250_96d866f2-3039-419f-88ec-ab26ddafea11.png?v=1674679613"
          alt="Comida deliciosa"
          className={styles.backgroundImage}
        />
        <div className={styles.introText}>
          <p>
            Explora una amplia variedad de recetas. Crea tus propias recetas y más.
          </p>
          <Link to="/home">
            <button className={styles.enterButton}>¡Comenzar Ahora!</button>
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2023 Nuestra Plataforma. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;


