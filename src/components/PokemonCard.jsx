import { motion } from "framer-motion";

function PokemonCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      className="pokemon-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
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
