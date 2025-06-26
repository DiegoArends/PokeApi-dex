import React, { useEffect, useState } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function PokemonList({ busqueda, tipo }) {
  const [listaGlobal, setListaGlobal] = useState([]);
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar la lista global al inicio
  useEffect(() => {
    fetch(`${API_URL}?limit=721&offset=0`)
      .then(res => res.json())
      .then(({ results }) => {
        setListaGlobal(results);
        cargarPokemones(results.slice(0, 50));
      });
    // eslint-disable-next-line
  }, []);

  function obtenerDetalle(url) {
    return fetch(url).then(res => res.json());
  }

  function cargarPokemones(lista) {
    setCargando(true);
    Promise.all(lista.map(p => obtenerDetalle(p.url)))
      .then(data => {
        setPokemones(data);
        setCargando(false);
      });
  }

  // Manejar búsqueda y filtrado por tipo
  useEffect(() => {
    // Si hay búsqueda, priorizar la búsqueda por nombre
    if (busqueda) {
      const valor = normalizarTexto(busqueda.trim().toLowerCase());
      const coincidencias = listaGlobal.filter(p =>
        normalizarTexto(p.name).includes(valor)
      );
      cargarPokemones(coincidencias.slice(0, 10));
      return;
    }

    // Si no hay búsqueda, manejar el filtrado por tipo
    if (!tipo || tipo === 'ver-todos') {
      // Mostrar todos los Pokémon
      cargarPokemones(listaGlobal.slice(0, 721));
    } else {
      // Filtrar por tipo específico
      setCargando(true);
      fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        .then(res => res.json())
        .then(data => {
          const pokemonsTipo = data.pokemon.map(p => p.pokemon);
          return Promise.all(pokemonsTipo.slice(0, 20).map(p => obtenerDetalle(p.url)));
        })
        .then(data => {
          setPokemones(data);
          setCargando(false);
        });
    }
    // eslint-disable-next-line
  }, [busqueda, tipo, listaGlobal]);

  return (
    <div className="pokemon-todos" id="listaPokemon">
      {cargando && <p>Cargando...</p>}
      {!cargando && pokemones.length === 0 && <p>No se encontraron coincidencias.</p>}
      {pokemones.map(pokemon => (
        <div className="pokemon" key={pokemon.id}>
          <p className="pokemon-id-back">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="pokemon-imagen">
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
          </div>
          <div className="pokemon-info">
            <div className="nombre-contenedor">
              <p className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</p>
              <h2 className="pokemon-nombre">{pokemon.name}</h2>
            </div>
            <div className="pokemon-tipos">
              {pokemon.types.map(t => (
                <span className={`tipo ${t.type.name}`} key={t.type.name}>{t.type.name}</span>
              ))}
            </div>
            <div className="pokemon-stats">
              <span className="stat">{pokemon.height / 10} m</span>
              <span className="stat">{pokemon.weight / 10} kg</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}