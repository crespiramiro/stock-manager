'use client'
import { useState } from "react"
import { IoIosSearch } from "react-icons/io";

export default function Searchbar () {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };
    
      const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para manejar la búsqueda
        console.log('Search query:', searchQuery);
      };

    return(

        <form onSubmit={handleSearchSubmit} className="search-bar hidden sm:flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="py-2 px-2 pr-20 rounded-lg border-opacity-50 border-2 text-black"
        />
        <button type="submit" className="px-4" >
          <IoIosSearch size={24} />
        </button>
      </form>

    )

}