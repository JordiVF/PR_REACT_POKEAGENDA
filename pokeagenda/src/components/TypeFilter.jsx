function TypeFilter({ value, onChange, types, labels }) {
  return (
    <div className="type-filter">
      <label className="type-filter__label">
        Filtrar por tipo
      </label>

      <select
        className="type-filter__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todos los tipos</option>

        {types.map(type => (
          <option key={type.name} value={type.name}>
            {labels[type.name] || type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeFilter;