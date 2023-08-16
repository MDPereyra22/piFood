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
          src="https://media.elpatagonico.com/p/818ec6f67a256c4f7ca313377649508b/adjuntos/193/imagenes/009/351/0009351366/1200x675/smart/sorrentinos.jpg"
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


