import { capitalize } from '../utils/strings.js';
import { tipoTraducido } from '../utils/strings.js';
import StatsBars from '../components/StatsBars.jsx';

function PokemonCard({ pokemon }) {
  return (
    <article className="card">
      <img
        src={pokemon.image}
        alt={capitalize(pokemon.name)}
        loading="lazy"
      />

      <div className="card__body">
        <h2>#{pokemon.id} · {capitalize(pokemon.name)}</h2>

        <ul className="types">
          {pokemon.types.map((type) => (
            <li key={type}>
              {tipoTraducido[type] || capitalize(type)}
            </li>
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
        <StatsBars stats={pokemon.stats} />
      </div>
    </article>
  );
}

export default PokemonCard;