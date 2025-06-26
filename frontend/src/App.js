import React, { useState } from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import './main.css';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('ver-todos'); // Nuevo estado

  return (
    <div className="App">
      <Header setTipo={setTipo} /> {/* Pasa la función al Header */}
      <main>
        <form id="form-busqueda" autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            id="input-busqueda"
            placeholder="Buscar Pokémon por nombre o número..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </form>
        <div id="todos">
          <PokemonList busqueda={busqueda} tipo={tipo} />
        </div>
      </main>
    </div>
  );
}

export default App;