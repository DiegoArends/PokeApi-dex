const listaPokemon = document.getElementById('listaPokemon');
const inputBusqueda = document.getElementById('input-busqueda');
const formBusqueda = document.getElementById('form-busqueda');
const botonHeader = document.querySelectorAll('.btn-header');

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
let listaGlobal = [];
let nombresPokemon = [];
let debounceTimeout;

// 🔄 Obtener lista global una sola vez
function cargarListaPokemon(limit = 721) {
  return fetch(`${API_URL}?limit=${limit}`)
    .then(res => {
      if (!res.ok) throw new Error('No se pudo obtener la lista global');
      return res.json();
    })
    .then(({ results }) => {
      listaGlobal = results;
      nombresPokemon = results.map(p => p.name);
      return results;
    });
}

// 🧠 Obtener detalles de un Pokémon usando .url
function obtenerDetalle(url) {
  return fetch(url).then(res => res.json());
}

// 🎨 Mostrar una tarjeta de Pokémon
function mostrarPokemon(pokemon) {
  const tipos = pokemon.types.map(t => `<p class="${t.type.name} tipo">${t.type.name}</p>`).join('');
  const pokeId = pokemon.id.toString().padStart(3, '0');

  const div = document.createElement('div');
  div.classList.add('pokemon');
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${pokemon.name}</h2>
      </div>
      <div class="pokemon-tipos">${tipos}</div>
      <div class="pokemon-stats">
        <p class="stat">${pokemon.height} m</p>
        <p class="stat">${pokemon.weight} kg</p>
      </div>
    </div>
  `;
  listaPokemon.appendChild(div);
}

// 📦 Cargar una lista de Pokémon y mostrarlos
function cargarPokemones(lista) {
  listaPokemon.innerHTML = '';
  lista.forEach(p =>
    obtenerDetalle(p.url)
      .then(data => mostrarPokemon(data))
      .catch(err => console.error(err))
  );
}

// 🔍 Buscar Pokémon por nombre parcial
function buscarPokemon(texto) {
  const valor = normalizarTexto(texto.trim().toLowerCase());
  listaPokemon.innerHTML = '<p>Buscando...</p>';

  if (!valor) {
    cargarPokemones(listaGlobal.slice(0, 20));
    return;
  }

  const coincidencias = listaGlobal.filter(p =>
    normalizarTexto(p.name).includes(valor)
  );

  if (coincidencias.length === 0) {
    listaPokemon.innerHTML = '<p>No se encontraron coincidencias.</p>';
    return;
  }

  listaPokemon.innerHTML = '';
  coincidencias.slice(0, 10).forEach(p =>
    obtenerDetalle(p.url).then(data => mostrarPokemon(data))
  );
}

// 🧽 Limpiar texto para búsqueda flexible
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 🎛 Filtro por tipo
function aplicarFiltroPorTipo(tipo) {
  listaPokemon.innerHTML = '<p>Cargando...</p>';

  const resultados = [];

  listaGlobal.forEach(p => {
    obtenerDetalle(p.url)
      .then(data => {
        const tipos = data.types.map(t => t.type.name);
        if (tipo === 'ver-todos' || tipos.includes(tipo)) {
          resultados.push(data);
          if (resultados.length === 1) listaPokemon.innerHTML = '';
          mostrarPokemon(data);
        }
      })
      .catch(err => console.error(err));
  });
}

// 🕹 Configurar eventos
function inicializarEventos() {
  inputBusqueda.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      buscarPokemon(inputBusqueda.value);
    }, 300);
  });

  formBusqueda.addEventListener('submit', e => e.preventDefault());

  botonHeader.forEach(boton => {
    boton.addEventListener('click', () => aplicarFiltroPorTipo(boton.id));
  });
}

// 🚀 Iniciar la app
cargarListaPokemon().then(() => {
  cargarPokemones(listaGlobal.slice(0, 20));
  inicializarEventos();
});
