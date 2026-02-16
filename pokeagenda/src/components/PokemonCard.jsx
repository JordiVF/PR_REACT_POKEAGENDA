function PokemonCard({ pokemon }) {
  return (
    <article className="card">
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <div className="card__body">
        <h2>#{pokemon.id} · {pokemon.name}</h2>
        <ul className="types">
          {pokemon.types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <dl className="stats">
          <div>
            <dt>Peso</dt>
            <dd>{pokemon.weight} kg</dd>
          </div>
          <div>
            <dt>Altura</dt>
            <dd>{pokemon.height} m</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default PokemonCard;