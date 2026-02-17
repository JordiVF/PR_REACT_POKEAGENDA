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
import Pagination from './components/Pagination.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [query, setQuery] = useState(() =>
    localStorage.getItem('query') || ''
  );
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(() =>
    localStorage.getItem('selectedType') || ''
  );
  const [types, setTypes] = useState([]);
  const PAGE_SIZE = 50;
  const [page, setPage] = useState(() =>
    Number(localStorage.getItem('page')) || 1
  );
  const [darkMode, setDarkMode] = useState(() =>
  localStorage.getItem('darkMode') === 'true'
);

  useEffect(() => {
    async function loadPokemons() {
      try {
        setStatus('loading');
        setError(null);

        const offset = (page - 1) * PAGE_SIZE;
        const data = await fetchPokemonList(PAGE_SIZE, offset);

        setPokemons(data);
        setStatus('success');

      } catch (error) {
        setError(error.message);
        setStatus('error');
      }
    }

    loadPokemons();
  }, [page]);

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

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('selectedType', selectedType);
  }, [selectedType]);

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

useEffect(() => {
  localStorage.setItem('darkMode', darkMode);
  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [darkMode]);

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

        <ThemeToggle
          dark={darkMode}
          onToggle={() => setDarkMode(v => !v)}
        />

        <SearchForm
          value={query}
          onChange={setQuery}
          onReset={() => {
            setQuery('');
            localStorage.removeItem('query');
          }}
        />

        <TypeFilter
            value={selectedType}
            onChange={setSelectedType}
            types={types}
            labels={tipoTraducido}
        />

        <Pagination
          page={page}
          onPrev={() => setPage(p => Math.max(1, p - 1))}
          onNext={() => setPage(p => p + 1)}
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