import MiniStatBox from "./MiniStatBox";

function MiniStatBoxContainer({ stats, maxColumns = 3 }) {
  return (
    <div
      className={`grid gap-4 p-4 place-items-center`}
      style={{
        gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))`,
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
