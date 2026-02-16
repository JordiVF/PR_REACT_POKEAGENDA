import './App.css';
import { useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [pokemons] = useState([]);

  return (
    <div className="app">
      <Layout>
        <Header />
        <SearchForm
          value={query}
          onChange={setQuery}
          onReset={() => setQuery('')}
        />
        <PokemonGrid items={pokemons} />
      </Layout>
    </div>
  );
}

export default App;