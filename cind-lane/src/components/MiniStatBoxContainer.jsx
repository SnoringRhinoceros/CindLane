import MiniStatBox from "./MiniStatBox";

function MiniStatBoxContainer({ stats, maxColumns = 3 }) {
  console.log(stats)
  return (
    <div
      className="grid gap-4 p-4 place-items-center w-full"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, // Auto-fit ensures it wraps gracefully
      }}
    >
      {stats.map((stat, index) => (
        <MiniStatBox
          key={index}
          text={stat.text}
          stat={stat.stat}
          description={stat.description}
        />
      ))}
    </div>
  );
}

export default MiniStatBoxContainer;
