import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import styles from "./Detail.module.css"; // Importa los estilos

const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.detail);

  return (
    <div className={styles.container}>
      {myRecipe ? (
        <div className={styles.card}>
          <Link to="/home">
            <button>Back to Home</button>
          </Link>
          <div className={styles.circleImage}>
            <img src={myRecipe.image} alt={myRecipe.title} />
          </div>
          <h1>{myRecipe.title}</h1>
          <p>{myRecipe.summary}</p>
          <p>Health Score: {myRecipe.healthScore}</p>
          <h2>Steps:</h2>
          <ul>
            {myRecipe.steps &&
              myRecipe.steps.map((step, index) => (
                <li key={index}>
                  <span>{index + 1}. </span>
                  {step.step}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

