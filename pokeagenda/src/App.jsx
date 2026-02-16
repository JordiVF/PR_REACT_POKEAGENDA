import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';
import { fetchPokemonList } from './services/pokeapi.js';

function App() {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemons() {
      try {
        setStatus('loading');
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

//El array de dependencias vacío ([]) indica que el efecto solo se ejecutará una vez al montar el componente. No añadimos fetchPokemonList como dependencia porque es una función importada estática que no cambia entre renders.

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