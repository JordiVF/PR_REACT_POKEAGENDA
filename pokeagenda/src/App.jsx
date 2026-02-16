import './App.css';
import { useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';

const MOCK_POKEMONS = [
  {
    id: 25,
    name: 'pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    weight: 6,
    height: 0.4,
  },
  {
    id: 1,
    name: 'bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    weight: 6.9,
    height: 0.7,
  },
];

/*Ahora const [query, setQuery] = useState('') es el estado que controla el valor del input de búsqueda. `pokemons` es el estado que contiene la lista de Pokémon (inicialmente con datos mock). `filteredPokemons` es una variable calculada usando `useMemo` que devuelve una lista filtrada de Pokémon según el valor de `query`. Si `query` está vacío, devuelve todos los Pokémon; de lo contrario, devuelve solo aquellos cuyo nombre incluye el texto de búsqueda (ignorando mayúsculas y espacios).
**useState** se utiliza para crear estados locales en el componente
**useMemo** se usa para memorizar el resultado de una función costosa (en este caso, el filtrado de la lista) y solo recalcularlo cuando las dependencias (`pokemons` o `query`) cambien. Esto mejora el rendimiento al evitar cálculos innecesarios en cada renderizado.*/

function App() {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState(MOCK_POKEMONS);

  const filteredPokemons = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return pokemons;
    }

    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(trimmedQuery)
    );
  }, [pokemons, query]);

  return (
    <div className="app">
      <Layout>
        <Header />
        <SearchForm
          value={query}
          onChange={setQuery}
          onReset={() => setQuery('')}
        />
        <PokemonGrid items={filteredPokemons} />
      </Layout>
    </div>
  );
}

export default App;