import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import styles from "./Detail.module.css";

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
            <button className={styles.backButton}>Back to Home</button>
          </Link>
          <div className={styles.circleImage}>
            <img src={myRecipe.image} alt={myRecipe.title} />
          </div>
          <h1>{myRecipe.title}</h1>
          <p>ID: {myRecipe.id}</p>
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
          <h2>Diets:</h2>
          <ul>
            {myRecipe.diets &&
              myRecipe.diets.map((diet, index) => (
                <li key={index}>{diet}</li>
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
