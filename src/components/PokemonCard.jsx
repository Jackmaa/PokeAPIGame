import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import typeColors from "../utils/typeColors";
import TypeBadge from "./TypeBadge";

function PokemonCard({ data }) {
  if (!data) return null;
  // ✅ Get the color of the Pokémon type
  const primaryType = data.types[0]?.type.name;
  const bgColor = typeColors[primaryType] || "#777";
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
      style={{
        background: `${bgColor}20`, // couleur transparente
        border: `2px solid ${bgColor}`,
        borderRadius: "1rem",
      }}
    >
      <button
        onClick={toggleFav}
        className="fav-button"
        aria-label="Favorite toggle"
      >
        {isFav ? "⭐" : "☆"}
      </button>
      <h2 style={{ color: bgColor, textShadow: `0 0 1px rgb(255, 255, 255)` }}>
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <div className="type-badges">
        {data.types.map((t) => (
          <span key={t.type.name}>
            <TypeBadge type={t.type.name} />
            {/* Using TypeBadge component instead of inline styles */}
          </span>
        ))}
      </div>
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
