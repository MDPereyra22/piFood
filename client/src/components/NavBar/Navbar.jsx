import React from "react";
import { useDispatch } from "react-redux";
import { sortRecipes, sortHealthScore, filteredRecipesByDiets, filterCreated } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";




const NavBar = () => {
  const dispatch = useDispatch();
  const handleSortAlphabetically = (event) => {
    dispatch(sortRecipes(event.target.value));
  };

  const handleSortByHealthScore = (event) => {
    dispatch(sortHealthScore(event.target.value));
  };

  const handleFilterByDiets = (event) => {
    dispatch(filteredRecipesByDiets(event.target.value))
  }

  const handleFilterCreated = (event) => {
    dispatch(filterCreated(event.target.value))
  }

  return (
    <div className={styles.navBarContainer}>
      <SearchBar />
      <select onChange={e => handleSortAlphabetically(e)}>
        <option value='ascendente'>Ascendente</option>
        <option value='descendente'>Descendente</option>
      </select>
      <select onChange={(e) => handleSortByHealthScore(e)}>
        <option value="ascendente">Health Score Ascendente</option>
        <option value="descendente">Health Score Descendente</option>
      </select>
      <select onChange={e => handleFilterByDiets(e)}>
        <option value="all">All</option>
        <option value="gluten free">Gluten free</option>
        <option value="dairy free">Dairy Free</option>
        <option value="lacto ovo vegetarian">Lacto Ovo-Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="primal">Primal</option>
        <option value="whole 30">Whole 30</option>
        <option value="pescatarian">Pescetarian</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="fodmap friendly">Foodmap friendly</option>
      </select>
      <select onChange={e => handleFilterCreated(e)}>
        <option value='all'>All</option>
        <option value='created'>Created</option>
        <option value='api'>Existentes</option>
      </select>
    </div>
  )

};

export default NavBar;
