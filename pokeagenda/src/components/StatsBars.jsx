function StatsBars({ stats }) {
  const max = 200;

  return (
    <div className="stats-bars">
      <StatBar label="HP" value={stats.hp} max={max} />
      <StatBar label="ATK" value={stats.attack} max={max} />
      <StatBar label="DEF" value={stats.defense} max={max} />
    </div>
  );
}

function StatBar({ label, value, max }) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="statbar">
      <span className="statbar__label">{label}</span>

      <div className="statbar__track">
        <div
          className="statbar__fill"
          style={{ width: percent + '%' }}
        />
      </div>

      <span className="statbar__value">{value}</span>
    </div>
  );
}

export default StatsBars;