import React from "react";
import styles from "./LandingPage.module.css"
import { Link } from "react-router-dom";

const LandingPage = () =>{
    return(
     <div className={styles.body}>
        <h1>Hola soy la LandingPage</h1>
        <Link to="/home">
            <button>
                Ingresar
            </button>
        </Link>
    </div>
    )
};
 

export default LandingPage;

