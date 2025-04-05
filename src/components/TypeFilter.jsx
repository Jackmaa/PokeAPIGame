import { useState, useEffect } from "react";
import axios from "axios";

function TypeFilter({ onSelectType, selectedType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/type");
        const filteredTypes = res.data.results.filter(
          (types) => !["shadow", "stellar", "unknown"].includes(types.name)
        ); // ← remove shadow and unknown types (shadow is a glitch type, unknown is a glitch type)
        setTypes(filteredTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchTypes();
  }, []);
  return (
    <div className="type-filter">
      <button
        onClick={() => onSelectType(null)}
        className={selectedType === null ? "selected" : ""}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type.name}
          onClick={() => onSelectType(type.name)}
          className={selectedType === type.name ? "selected" : ""}
        >
          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
        </button>
      ))}
    </div>
  );
}
export default TypeFilter;
