import { motion } from "framer-motion";

function PokemonCard({ data }) {
  return (
    <motion.div
      key={data.id} // Unique identifier for the pokemon used here to ensure smooth transitions when the pokemon changes
      className="pokemon-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>
        <strong>Type: </strong>
        {data.types.map((type) => type.type.name).join(", ")}
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
        <strong>Abilities: </strong>
        <ul>
          {data.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
