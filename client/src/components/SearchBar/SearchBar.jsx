import { useState } from "react";
import styles from "./Searchbar.module.css"
export default function SearchBar({onSearch}) {

   const [id, setId] = useState("");

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <div >
         <input className={styles.divSearch} type='search' 
         placeholder="Busca un personaje..." 
         onChange={handleChange}
         value={id} />
         <button onClick={()=>{onSearch(id)}}>Agregar</button>
      </div>
   );
}