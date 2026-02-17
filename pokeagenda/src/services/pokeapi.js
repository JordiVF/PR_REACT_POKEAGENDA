const API_BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 151, offset = 0) {
  const response = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar la lista de Pokémon');
  }

  const data = await response.json();

  const detailedPromises = data.results.map(async (item) => {
    const detailResponse = await fetch(item.url);

    if (!detailResponse.ok) {
      throw new Error('No se pudo cargar el detalle de un Pokémon');
    }

    return detailResponse.json();
  });

  const detailedPokemons = await Promise.all(detailedPromises);

  return detailedPokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default,
    types: pokemon.types.map((typeInfo) => typeInfo.type.name),
    weight: pokemon.weight / 10,
    height: pokemon.height / 10,
    stats: {
      hp: pokemon.stats.find(s => s.stat.name === 'hp').base_stat,
      attack: pokemon.stats.find(s => s.stat.name === 'attack').base_stat,
      defense: pokemon.stats.find(s => s.stat.name === 'defense').base_stat,
    },
  }));
}