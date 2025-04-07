import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";

function PokemonCard({ data }) {
  if (!data) return null;

  const [isFav, setIsFav] = useState(false);

  // ✅ Check localStorage on mount
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const found = favs.some((p) => p.id === data.id);
    setIsFav(found);
  }, [data.id]); // re-check when the component changes Pokémon

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (isFav) {
      updated = favs.filter((p) => p.id !== data.id);
    } else {
      updated = [...favs, data];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFav(!isFav);
  };
  return (
    <motion.div
      className="pokemon-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <button
        onClick={toggleFav}
        className="fav-button"
        aria-label="Favorite toggle"
      >
        {isFav ? "⭐" : "☆"}
      </button>
      <h2>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>
        <strong>Type: </strong>
        {data.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Height: </strong>
        {data.height}
      </p>
      <p>
        <strong>Weight: </strong>
        {data.weight}
      </p>
      <div>
        <strong>Abilities:</strong>
        <ul>
          {data.abilities.map((a, i) => (
            <li key={i}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
