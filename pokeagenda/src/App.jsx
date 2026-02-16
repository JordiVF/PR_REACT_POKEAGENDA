import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';
import Feedback from './components/Feedback.jsx';
import { fetchPokemonList } from './services/pokeapi.js';
import { tipoTraducido } from './utils/strings.js';
import TypeFilter from './components/TypeFilter.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function loadPokemons() {
      try {
        setStatus('loading');
        setError(null);
        const data = await fetchPokemonList();
        setPokemons(data);
        setStatus('success');
      } catch (error) {
        setError(error.message);
        setStatus('error');
      }
    }

    loadPokemons();
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(res => res.json())
      .then(data => {
        const validTypes = data.results.filter(t =>
          !['unknown', 'shadow'].includes(t.name)
        );
        setTypes(validTypes);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredPokemons = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    return pokemons.filter((pokemon) => {
      const matchesName =
        !trimmedQuery ||
        pokemon.name.toLowerCase().includes(trimmedQuery);

      const matchesType =
        !selectedType ||
        pokemon.types.includes(selectedType);

      return matchesName && matchesType;
    });
  }, [pokemons, query, selectedType]);

  const noResults = status === 'success' && !filteredPokemons.length;

  return (
    <div className="app">
      <Layout>
        <Header />

        <SearchForm
          value={query}
          onChange={setQuery}
          onReset={() => setQuery('')}
        />

        <TypeFilter
            value={selectedType}
            onChange={setSelectedType}
            types={types}
            labels={tipoTraducido}
        />

        <Feedback status={status} errorMessage={error} />

        {!noResults && <PokemonGrid items={filteredPokemons} />}

        {noResults && (
          <p className="empty">
            No encontramos ningún Pokémon con ese filtro.
          </p>
        )}
      </Layout>
    </div>
  );
}

export default App;