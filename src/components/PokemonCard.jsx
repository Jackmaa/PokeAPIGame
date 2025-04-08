import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";

import typeColors from "../utils/typeColors";
import typeEmojis from "../utils/typeEmojis";

function PokemonCard({ data, onSelectType }) {
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
      <div
        className="pokemon-types"
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        {data.types.map((t) => (
          <button
            key={t.type.name}
            onClick={() => onSelectType(t.type.name)} // tu passes ça en prop ou contexte
            title={`Filter by ${t.type.name} type`}
            style={{
              backgroundColor: typeColors[t.type.name] + "22",
              color: typeColors[t.type.name],
              border: `1px solid ${typeColors[t.type.name]}`,
              borderRadius: "0.5rem",
              padding: "0.2rem 0.5rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            {typeEmojis[t.type.name] || "🔹"} {t.type.name.toUpperCase()}
          </button>
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
