import typeColors from "../utils/typeColors";

export default function TypeBadge({ type }) {
  const color = typeColors[type] || "#777";

  return (
    <span
      className="type-badge"
      style={{
        backgroundColor: color,
        color: "white",
        borderRadius: "0.5rem",
        padding: "0.25rem 0.6rem",
        marginRight: "0.4rem",
        fontSize: "0.75rem",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      {type.toUpperCase()}
    </span>
  );
}
