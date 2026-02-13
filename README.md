# Práctica guiada React: PokéAgenda con PokeAPI

> En esta práctica guiada, construiremos una pequeña aplicación llamada "PokéAgenda" utilizando React. La aplicación permitirá a los usuarios buscar Pokémon por nombre y mostrar información relevante sobre ellos, como su imagen, tipos, peso y altura. Para obtener los datos de los Pokémon, utilizaremos la PokeAPI, una API pública que proporciona información detallada sobre todos los Pokémon.

---

## Índice

- [Práctica guiada React: PokéAgenda con PokeAPI](#práctica-guiada-react-pokéagenda-con-pokeapi)
  - [Índice](#índice)
  - [1. Objetivos de aprendizaje](#1-objetivos-de-aprendizaje)
  - [2. ¿Qué es React y por qué usarlo?](#2-qué-es-react-y-por-qué-usarlo)
  - [3. Entorno y requisitos previos](#3-entorno-y-requisitos-previos)
  - [4. Configuración inicial con Vite](#4-configuración-inicial-con-vite)
  - [5. Limpieza del proyecto base](#5-limpieza-del-proyecto-base)
    - [Archivos a editar/eliminar](#archivos-a-editareliminar)
  - [6. Plan de la práctica](#6-plan-de-la-práctica)
  - [7. Hito 1 · Estructura y estilos generales](#7-hito-1--estructura-y-estilos-generales)
  - [8. Hito 2 · Componentes y props](#8-hito-2--componentes-y-props)
  - [9. Hito 3 · Estado, eventos y búsqueda](#9-hito-3--estado-eventos-y-búsqueda)
  - [10. Hito 4 · Llamadas a PokeAPI con `fetch`](#10-hito-4--llamadas-a-pokeapi-con-fetch)
  - [11. Hito 5 · Manejo de carga y errores](#11-hito-5--manejo-de-carga-y-errores)
  - [12. Hito 6 · Mejora visual y card de Pokémon](#12-hito-6--mejora-visual-y-card-de-pokémon)
  - [13. Bonus: Retos opcionales](#13-bonus-retos-opcionales)
  - [14. Explicación detallada del código final](#14-explicación-detallada-del-código-final)
    - [Árbol del proyecto](#árbol-del-proyecto)
    - [Flujo de datos](#flujo-de-datos)
    - [Hooks y conceptos clave](#hooks-y-conceptos-clave)
  - [15. Anexos y recursos](#15-anexos-y-recursos)
    - [Glosario rápido](#glosario-rápido)
    - [Recursos recomendados](#recursos-recomendados)
    - [Errores frecuentes](#errores-frecuentes)
    - [Cómo preparar el deploy](#cómo-preparar-el-deploy)

---

## 1. Objetivos de aprendizaje

- Comprender qué resuelve React y sus conceptos básicos (componentes, JSX, props, estado, efectos).
- Familiarizarse con la estructura de un proyecto creado con Vite + React.
- Aprender a consumir una API REST (PokeAPI) desde React.
- Practicar el manejo de eventos, formularios controlados y renderizado condicional.
- Desarrollar una pequeña aplicación "PokéAgenda" que permita buscar Pokémon y ver detalles relevantes.
- Adoptar buenas prácticas de legibilidad, modularización y estilos.

## 2. ¿Qué es React y por qué usarlo?

React es una biblioteca de JavaScript para construir interfaces de usuario basadas en componentes. Fue creada por Meta (Facebook) y se centra en:

- **Componentización:** dividir la UI en piezas reutilizables.
- **Renderizado declarativo:** describimos "qué" queremos ver, React se encarga del "cómo".
- **Actualizaciones eficientes:** gracias al Virtual DOM, React actualiza solo lo necesario.

React se integra bien con APIs, tiene una enorme comunidad, y sus conceptos se extienden a frameworks como Next.js, React Native o Remix.

## 3. Entorno y requisitos previos

- Node.js 18 o superior (comprueba con `node -v`).
- npm 9 o superior (comprueba con `npm -v`).
- Editor de código (VS Code recomendado).
- Navegador moderno (Chrome, Edge, Firefox).

> Si no tienes Node.js, descárgalo de https://nodejs.org

## 4. Configuración inicial con Vite

1. Abre una terminal y navega a la carpeta donde quieres trabajar.
2. Ejecuta:
   ```bash
   npm create vite@latest pokeagenda -- --template react
   ```
3. Entra en la carpeta recién creada:
   ```bash
   cd pokeagenda
   ```
4. Instala dependencias:
   ```bash
   npm install
   ```
5. Lanza el servidor de desarrollo para comprobar que todo funciona:
   ```bash
   npm run dev
   ```
En este punto puede abrir `http://localhost:5173` en tu navegador y ver la plantilla de React con Vite.

## 5. Limpieza del proyecto base

Antes de empezar, limpiaremos el esqueleto generado por Vite para trabajar con una base simple.
React trae algunos archivos y componentes de ejemplo que no necesitamos para esta práctica.

La aplicación base tiene los siguientes archivos: 
- `src/App.jsx`: componente principal con contenido de ejemplo. (la propia aplicación)
- `src/App.css`: estilos asociados a `App.jsx`. 
- `src/assets/react.svg`: logo de React. 
- `src/index.css`: estilos globales (puedes dejarlo vacío o con un reset básico, es el punto de entrada de la aplicación). 
- `src/main.jsx`: punto de entrada que monta `<App />`.

Como puedes ver React usa JSX, una sintaxis que mezcla JavaScript con HTML. Esto permite escribir componentes de forma declarativa. En JSX, cada etiqueta HTML se convierte en una llamada a `React.createElement`, y los componentes personalizados (como `<App />`) se tratan como funciones que devuelven JSX. Además las etiquetas deben cerrarse, incluso las vacías (`<img />`), y los atributos se escriben en camelCase (`className` en lugar de `class`). 

Cuando una función devuelve JSX, React lo interpreta y lo convierte en elementos del DOM que se renderizan en la página. Cuando se intentan devolver múltiples elementos, deben estar envueltos en un contenedor (como un `<div>` o `<>` fragment).

Muchas funciones de React, como `useState` o `useEffect`, se importan desde el paquete `react` y se utilizan dentro de los componentes para gestionar estado y efectos secundarios.

useState permite añadir estado local a los componentes funcionales, mientras que useEffect se usa para ejecutar código en respuesta a cambios en el componente (como cargar datos al montar).


### Archivos a editar/eliminar

- Elimina `src/assets/react.svg` y cualquier import asociado.
- Deja `App.css`, `index.css` y `App.jsx` vacíos o con funciones mínimas.
- Mantén `main.jsx` pero revisa que solo monte `<App />`.

**Objetivo:** tener una aplicación base que solo muestre "Hola PokéAgenda".

`src/App.jsx` mínima:
```jsx
import './App.css';

function App() {
  return (
    <main className="app">
      <h1>PokéAgenda</h1>
    </main>
  );
}

export default App;
```

`src/App.css` inicial:
```css
.app {
  font-family: system-ui, sans-serif;
  min-height: 100vh;
  display: grid;
  place-items: center;
}
```

## 6. Plan de la práctica

Trabajaremos en 6 hitos consecutivos:

1. **Estructura y estilos básicos.**
2. **Crear componentes y pasar props.**
3. **Gestionar estado y formularios controlados.**
4. **Consumir PokeAPI y transformar datos.**
5. **Gestionar estados de carga, éxito y error.**
6. **Pulir la UI con tarjetas y tipografías.**

Cada hito se apoya en el anterior. Lee primero el hito completo, luego ejecútalo paso a paso.

---

## 7. Hito 1 · Estructura y estilos generales

**Objetivo:** montar la estructura visual básica de la app.

1. Crea carpeta `src/components`. Estará destinada a contener los componentes reutilizables de la aplicación. Esto ayuda a mantener el proyecto organizado y facilita la escalabilidad a medida que se añadan más funcionalidades. Además los componentes son reutilizables en cualquier parte de la aplicación, o en diferentes proyectos, lo que fomenta la modularidad y el mantenimiento del código. En esta carpeta se alojarán componentes como `Layout`, `Header`, `SearchForm`, `PokemonGrid`, `PokemonCard` y `Feedback`.

2. Crea carpeta `src/services` para centralizar la lógica de comunicación con APIs externas. Esto permite separar las preocupaciones, manteniendo el código de red aislado del código de presentación. En esta carpeta se alojará el archivo `pokeapi.js`, que contendrá funciones para realizar peticiones a la PokeAPI y transformar los datos recibidos en un formato adecuado para la aplicación. Como puedes ver la comunicación con la API se realiza de forma independiente, lo que facilita su mantenimiento y posibles cambios futuros (como cambiar de API o añadir caching), y en un archivo .js común que puede ser importado desde cualquier componente que necesite acceder a los datos de Pokémon.

3. Crea carpeta `src/utils` para funciones auxiliares que pueden ser usadas en diferentes partes de la aplicación. Esto ayuda a evitar la duplicación de código y a mantener las funciones de utilidad centralizadas. En esta carpeta se alojará el archivo `strings.js`, que contendrá funciones relacionadas con el manejo de cadenas de texto, como la función `capitalize` que se usará para capitalizar los nombres de los Pokémon y sus tipos. Al tener estas funciones en un archivo separado, se promueve la reutilización y se mejora la organización del código.
   
4. Crea los componentes `Layout.jsx` y `Header.jsx`.
- `Layout` será un contenedor que centrará el contenido y le dará un fondo agradable. 
- `Header` presentará el título de la aplicación y una breve descripción. 
  
5. Define una hoja de estilos global `src/index.css` con reset sencillo.

La diferencia entre index.css y App.css es que index.css se aplica a toda la aplicación y suele contener estilos globales, resets o variables CSS, mientras que App.css se enfoca en estilos específicos del componente App y sus hijos directos. Mantener esta separación ayuda a organizar mejor los estilos y a evitar conflictos.

`src/index.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f5f5f5;
  color: #1b1b1b;
}

a {
  color: inherit;
  text-decoration: none;
}
```

`src/components/Layout.jsx`:

```jsx
function Layout({ children }) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

export default Layout;
```

`src/App.css` (actualiza con variables y estilos base):

```css
:root {
  --primary: #ef5350;
  --secondary: #fdd835;
  --text: #212121;
  --surface: #ffffff;
  --radius: 16px;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffebee, #fffde7);
  padding: 32px;
}

.layout {
  max-width: 960px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.1);
  padding: 48px;
}
```

`src/components/Header.jsx`:

```jsx
function Header() {
  return (
    <header className="header">
      <h1>PokéAgenda</h1>
      <p>Explora Pokémon, conoce sus tipos y estadísticas básicas.</p>
    </header>
  );
}

export default Header;
```

Agrega estilos al header en `App.css`:

```css
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 8px;
  color: var(--primary);
}
```

Actualiza `App.jsx` para usar `Layout` y `Header`:

```jsx
import './App.css';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="app">
      <Layout>
        <Header />
      </Layout>
    </div>
  );
}

export default App;
```

Prueba en el navegador. Deberías ver un contenedor centrado con el título y subtítulo.

---

## 8. Hito 2 · Componentes y props

**Objetivo:** crear la UI para la búsqueda y la lista.

1. Añade los componentes:
   - `SearchForm.jsx` (formulario controlado más adelante).
   - `PokemonGrid.jsx` (estructuras de tarjeta).
   - `PokemonCard.jsx` (presenta info de cada Pokémon).

`src/components/SearchForm.jsx` (estructura inicial). 
Su parámetro es un objeto con **props** para controlar el input y manejar eventos. El formulario es controlado porque su valor está gestionado por React a través de props, lo que permite sincronizar el estado del input con el estado de la aplicación y facilita la validación y el manejo de eventos. 
**¿Qué son los props?** Son propiedades que se pasan a los componentes para configurar su comportamiento o apariencia. En este caso, `value` representa el valor actual del input, `onChange` es una función que se llama cada vez que el usuario escribe algo en el input para actualizar el estado en el componente padre, y `onReset` es una función que se llama cuando el usuario hace clic en el botón de limpiar para restablecer el valor del input. 
**Diferencia entre prop y estado**: el estado es un dato interno que puede cambiar a lo largo del tiempo dentro de un componente, mientras que las props son datos que se pasan desde un componente padre a un componente hijo para configurar su comportamiento o apariencia. 
En este caso, `SearchForm` no tiene estado propio, sino que recibe su valor y las funciones para manejar cambios a través de props, lo que lo convierte en un componente controlado por su padre (`App.jsx`).
```jsx
function SearchForm({ value, onChange, onReset }) {
  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <label className="search-form__label" htmlFor="query">Busca un Pokémon</label>
      <div className="search-form__controls">
        <input
          id="query"
          name="query"
          type="text"
          placeholder="pikachu, bulbasaur, charmander..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
        <button type="button" onClick={onReset}>Limpiar</button>
      </div>
    </form>
  );
}

export default SearchForm;
```

Ahora creamos el componente `PokemonGrid.jsx`, que se encargará de mostrar una cuadrícula de tarjetas de Pokémon. Recibe una prop `items`, que es un array de objetos con la información de cada Pokémon. Si el array está vacío, muestra un mensaje indicando que no hay resultados. De lo contrario, mapea cada Pokémon a un componente `PokemonCard`, pasando la información necesaria como props.
`src/components/PokemonGrid.jsx`:

```jsx
import PokemonCard from './PokemonCard.jsx';

function PokemonGrid({ items }) {
  if (!items.length) {
    return (
      <p className="empty">No hay resultados que coincidan con tu búsqueda.</p>
    );
  }

  return (
    <section className="grid" aria-live="polite">
      {items.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonGrid;
```
Ahora creamos el componente `PokemonCard.jsx`, que se encargará de mostrar la información de cada Pokémon en una tarjeta. Recibe una prop `pokemon`, que es un objeto con los datos del Pokémon (id, name, image, types, weight, height). La tarjeta muestra la imagen del Pokémon, su nombre e id, sus tipos y sus estadísticas de peso y altura. Se utilizan estilos para darle un diseño atractivo y organizado.
`src/components/PokemonCard.jsx` (estructura base con props):

```jsx
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
```

Añade estilos en `App.css` para formulario y tarjetas:
```css
.search-form {
  display: grid;
  gap: 12px;
  margin-bottom: 32px;
}

.search-form__label {
  font-weight: 600;
}

.search-form__controls {
  display: flex;
  gap: 12px;
}

.search-form input {
  flex: 1;
  padding: 12px;
  border-radius: 999px;
  border: 1px solid #d0d0d0;
  font-size: 1rem;
}

.search-form button {
  padding: 12px 20px;
  border-radius: 999px;
  border: none;
  background: var(--primary);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  padding: 16px;
  display: grid;
  gap: 12px;
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
}

.card__body h2 {
  margin: 0 0 12px;
  font-size: 1.25rem;
}

.types {
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0 0 12px;
}

.types li {
  background: var(--secondary);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin: 0;
}

.stats div {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 8px;
  text-align: center;
}

.empty {
  text-align: center;
  color: #757575;
}
```

En `App.jsx`, prepara espacio para estos componentes (sin lógica aún):
```jsx
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
```

---

## 9. Hito 3 · Estado, eventos y búsqueda

**Objetivo:** controlar el valor del input y preparar la lógica de filtrado.

1. Añade estado `pokemons` con datos falsos para probar el renderizado.
2. Implementa `filteredPokemons` que filtre por nombre.

`App.jsx` durante este hito:
```jsx
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

Ahora const [query, setQuery] = useState('') es el estado que controla el valor del input de búsqueda. `pokemons` es el estado que contiene la lista de Pokémon (inicialmente con datos mock). `filteredPokemons` es una variable calculada usando `useMemo` que devuelve una lista filtrada de Pokémon según el valor de `query`. Si `query` está vacío, devuelve todos los Pokémon; de lo contrario, devuelve solo aquellos cuyo nombre incluye el texto de búsqueda (ignorando mayúsculas y espacios).
**useState** se utiliza para crear estados locales en el componente
**useMemo** se usa para memorizar el resultado de una función costosa (en este caso, el filtrado de la lista) y solo recalcularlo cuando las dependencias (`pokemons` o `query`) cambien. Esto mejora el rendimiento al evitar cálculos innecesarios en cada renderizado.

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
```
Como se puede ver, el return de `App` no ha cambiado, pero ahora el componente tiene lógica para controlar el estado del input y filtrar la lista de Pokémon.Arranca el servidor (`npm run dev`) y prueba a escribir en el input. Deberías ver cómo se filtra la lista de Pokémon según lo que escribas. Por ejemplo, si escribes "pik", solo debería mostrar a Pikachu. Si borras el input, volverán a aparecer todos los Pokémon del mock.

---

## 10. Hito 4 · Llamadas a PokeAPI con `fetch`

**Objetivo:** sustituir los datos mock por datos reales desde https://pokeapi.co/

1. Crea un servicio en `src/services/pokeapi.js` para centralizar las peticiones.
2. Usa `useEffect` para disparar la carga al montar el componente.
3. Transforma la respuesta para dejar solo los datos que necesitas.

`src/services/pokeapi.js`:
```jsx
const API_BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 151) {
  const response = await fetch(`${API_BASE}/pokemon?limit=${limit}`);

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
  }));
}
```
Aquí se hacen 151 peticiones: una para obtener la lista de Pokémon y luego una por cada Pokémon para obtener su detalle. La función `fetchPokemonList` devuelve un array de objetos con solo la información que necesitamos para mostrar en la aplicación. Esto es aceptable para esta práctica, pero en una aplicación real se podrían optimizar las peticiones o usar una API que ya entregue toda la información en una sola llamada.

> Nota: PokeAPI entrega peso y altura en decímetros/hectogramos. Dividimos entre 10 para mostrar metros y kilogramos.

Actualiza `App.jsx` para usar los datos reales:
```jsx
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

El array de dependencias vacío ([]) indica que el efecto solo se ejecutará una vez al montar el componente. No añadimos fetchPokemonList como dependencia porque es una función importada estática que no cambia entre renders.

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
```

Arranca `npm run dev` y comprueba que se listan los primeros 151 Pokémon.

---

## 11. Hito 5 · Manejo de carga y errores

**Objetivo:** mostrar mensajes amigables según el estado de la petición.

1. Crea un componente `Feedback.jsx` para centralizar mensajes.
2. Usa `status` (`idle`, `loading`, `success`, `error`) para decidir qué renderizar.

`src/components/Feedback.jsx`:
```jsx
function Feedback({ status, errorMessage }) {
  if (status === 'loading') {
    return <p className="feedback">Cargando Pokémon...</p>;
  }

  if (status === 'error') {
    return (
      <p className="feedback feedback--error">
        {errorMessage || 'Ha ocurrido un error inesperado.'}
      </p>
    );
  }


  return null;
}

export default Feedback;
```
Como puedes ver, en React, los componentes funcionales reciben sus props como un objeto, que normalmente se desestructura en el parámetro de la función.

Añade estilos a `App.css`:
```css
.feedback {
  text-align: center;
  padding: 16px;
  border-radius: var(--radius);
  background: rgba(63, 81, 181, 0.08);
  color: #3f51b5;
}

.feedback--error {
  background: rgba(244, 67, 54, 0.12);
  color: #d32f2f;
}

.feedback--warning {
  background: rgba(255, 193, 7, 0.16);
  color: #f57c00;
}
```

Actualiza `App.jsx`:
```jsx
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';
import Feedback from './components/Feedback.jsx';
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

  const filteredPokemons = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return pokemons;
    }

    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(trimmedQuery)
    );
  }, [pokemons, query]);

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
        <Feedback status={status} errorMessage={error} />
        {!noResults && <PokemonGrid items={filteredPokemons} />}
        {noResults && (
          <p className="empty">
            No encontramos ningún Pokémon con ese nombre. Intenta con otro.
          </p>
        )}
      </Layout>
    </div>
  );
}

export default App;
```

Prueba a desconectar internet para ver el mensaje de error.

---

## 12. Hito 6 · Mejora visual y card de Pokémon

**Objetivo:** añadir matices visuales, capitalizar nombres y preparar la aplicación para producción.

1. Crea un helper `capitalize` en `src/utils/strings.js`.
2. Úsalo en el renderizado de nombres.
3. Ajusta el layout para pantallas pequeñas.

`src/utils/strings.js`:
```jsx
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
```

Actualiza `PokemonCard.jsx`:
```jsx
import { capitalize } from '../utils/strings.js';

function PokemonCard({ pokemon }) {
  return (
    <article className="card">
      <img src={pokemon.image} alt={capitalize(pokemon.name)} loading="lazy" />
      <div className="card__body">
        <h2>#{pokemon.id} · {capitalize(pokemon.name)}</h2>
        <ul className="types">
          {pokemon.types.map((type) => (
            <li key={type}>{capitalize(type)}</li>
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
```

Mejora de estilos responsivos en `App.css`:
```css
@media (max-width: 720px) {
  .layout {
    padding: 32px 20px;
  }

  .search-form__controls {
    flex-direction: column;
  }

  .search-form button {
    width: 100%;
  }
}
```

> Ya tenemos una pokeAgenda funcional, con datos reales, manejo de estados y una UI agradable. El siguiente paso sería preparar el proyecto para producción, asegurándonos de que el código esté limpio, optimizado y listo para ser desplegado en cualquier hosting estático.

---

## 13. Bonus: Retos opcionales

1. Permitir filtrar por tipo (agua, planta, fuego...).
2. Mostrar estadísticas base (HP, ataque, defensa) en un gráfico sencillo.
3. Añadir paginación para cargar más de 151 Pokémon.
4. Guardar la última búsqueda en `localStorage` para rehidratarla al recargar.
5. Implementar un modo oscuro y guardar la preferencia del usuario.

---

## 14. Explicación detallada del código final

### Árbol del proyecto

```
pokeagenda/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Feedback.jsx
    │   ├── Header.jsx
    │   ├── Layout.jsx
    │   ├── PokemonCard.jsx
    │   ├── PokemonGrid.jsx
    │   └── SearchForm.jsx
    ├── services/
    │   └── pokeapi.js
    └── utils/
        └── strings.js
```

### Flujo de datos

- `App.jsx` es el contenedor principal. Gestiona estado (`query`, `pokemons`, `status`, `error`).
- `useEffect` en `App.jsx` se ejecuta una sola vez al montar y carga los datos desde PokeAPI.
- `fetchPokemonList` en `services/pokeapi.js` encapsula la lógica de red y la transformación de datos.
- `SearchForm` notifica cambios con `onChange` y `onReset`, manteniendo el input como controlado.
- `filteredPokemons` memorizado con `useMemo` evita filtrados innecesarios.
- `Feedback` muestra mensajes según `status` y `error`.
- `PokemonGrid` recibe un array y lo convierte en tarjetas mediante `PokemonCard`.
- `PokemonCard` presenta los atributos principales, capitalizando los textos mediante `capitalize`.

### Hooks y conceptos clave

- **`useState`** gestiona estado local.
- **`useEffect`** ejecuta efectos secundarios (fetch a la API).
- **`useMemo`** calcula valores derivados evitando recomputaciones.
- **Renderizado condicional**: decide qué mostrar según `status` y `noResults`.
- **Props**: comunican datos y comportamientos entre componentes.

---

## 15. Anexos y recursos

### Glosario rápido

- **Componente**: función que devuelve JSX.
- **JSX**: extensión de JavaScript que permite escribir HTML dentro de JS.
- **Prop (properties)**: valores que se pasan de un componente padre a uno hijo.
- **Estado (state)**: datos internos que cambian con el tiempo.
- **Efecto (effect)**: lógica que se ejecuta en respuesta a cambios en el componente.

### Recursos recomendados

- Documentación oficial React: https://react.dev
- PokeAPI docs: https://pokeapi.co/docs/v2
- Guía de estilos CSS en React: https://css-tricks.com/css-in-react/
- Cheat sheet de hooks: https://react.dev/reference/react

### Errores frecuentes

- **CORS o fetch bloqueado**: revisa la URL y que uses HTTPS.
- **`Cannot read properties of undefined`**: comprueba que existan los campos antes de usarlos.
- **`Too many re-renders`**: evita llamar a `setState` dentro del render sin condiciones.

### Cómo preparar el deploy

1. Ejecuta `npm run build` para generar `/dist`.
2. Sube el contenido de `/dist` a cualquier hosting estático (Netlify, Vercel, GitHub Pages).
3. O usa `npm run preview` para revisar el build localmente.

> Recuerda versionar con Git: `git init`, `git add .`, `git commit -m "feat: pokeagenda inicial"`.


