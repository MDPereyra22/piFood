import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filteredCharacterByDiets, sortRecipes, sortHealthScore } from "../../actions";
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import styles from "./Home.module.css"

const Home = () => {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;

    
    useEffect(() => {
        dispatch(getRecipes());
    }, [])

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRecipes());
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const recipesToShow = allRecipes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allRecipes.length / recipesPerPage)

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    const handleFilterByDiets = (event) =>{
        dispatch(filteredCharacterByDiets(event.target.value))
    }

    const handleSortAlphabetically = (event) => {
        dispatch(sortRecipes(event.target.value));
    };

    const handleSortByHealthScore = (event) => {
        dispatch(sortHealthScore(event.target.value));
    };
    
    
    return (
        <div >
            <Link to="/recipe"> Crear receta </Link>
            <h1>Bienvenidos a FOOD</h1>
            <button onClick={e => { handleClick(e) }}>
                Recargar recetas
            </button>

            <div>
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
                <select>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <div className={styles.divContenedor}>
                    {
                        recipesToShow.map((element) => {
                            const diets = element.diets.join(", ");
                            console.log(diets)
                            return <Card key={element.id} title={element.title} image={element.image} diets={diets} />
                        })
                    }

                </div>

                <div>
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Home;