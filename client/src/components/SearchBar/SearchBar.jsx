import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";


const SearchBar = () => {
   const dispatch = useDispatch();
   const [name, setName] = useState("");

   const handleChange= (event) => {
      event.preventDefault();
      setName(event.target.value)
      console.log(name)
   }

   const handleSubmit=(event)=>{
      event.preventDefault();
      dispatch(getNameRecipes(name))
   }
   return (
      <div>
         <input type="text" placeholder="Search..." onChange={(e)=> handleChange(e)}/>
         <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button> 
      </div>
   )
}


export default SearchBar;



// import { useState } from "react";
// import styles from "./Searchbar.module.css"
// export default function SearchBar({onSearch}) {

//    const [id, setId] = useState("");

//    const handleChange = (event) => {
//       setId(event.target.value)
//    }

//    return (
//       <div >
//          <input className={styles.divSearch} type='search'
//          placeholder="Busca un personaje..."
//          onChange={handleChange}
//          value={id} />
//          <button onClick={()=>{onSearch(id)}}>Agregar</button>
//       </div>
//    );
// }