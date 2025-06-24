const listaPokemon = document.getElementById('listaPokemon');
const botonHeader = document.querySelectorAll('.btn-header');
let URL = 'https://pokeapi.co/api/v2/pokemon';
let debounceTimeout;

for (let i = 1; i <= 721; i++) {
    fetch(`${URL}/${i}`)
        .then(response => response.json())
        .then(data => mostrarPokemon(data)
        )
}
function mostrarPokemon(pokemon) {

    let tipos = pokemon.types.map((tipo) => `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`).join('');

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = '00' + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId;
    }

    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    pokemonDiv.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p> 
                    <div class="pokemon-imagen">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}"
                            alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${pokemon.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height} m</p>
                            <p class="stat">${pokemon.weight} kg</p>
                        </div>
                    </div>
    `;
    listaPokemon.appendChild(pokemonDiv);
}
botonHeader.forEach(boton => {
    boton.addEventListener('click', (event) => {
        const botonId = event.currentTarget.id;
        listaPokemon.innerHTML = '';

        for (let i = 1; i <= 721; i++) {
            fetch(`${URL}/${i}`)
                .then(response => response.json())
                .then(data => {
                    if (botonId === 'ver-todos') {
                        mostrarPokemon(data);
                    }
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                })
        }
    });
});

const formBusqueda = document.getElementById('form-busqueda');
const inputBusqueda = document.getElementById('input-busqueda');

function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

inputBusqueda.addEventListener('input', function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      let valor = inputBusqueda.value.trim().toLowerCase();
      valor = normalizarTexto(valor);
      listaPokemon.innerHTML = '';
  
      if (valor) {
        const coincidencias = nombresPokemon.filter(nombre =>
          normalizarTexto(nombre).includes(valor)
        );
  
        if (coincidencias.length === 0) {
          listaPokemon.innerHTML = '<p>No se encontraron coincidencias.</p>';
        } else {
          coincidencias.slice(0, 10).forEach(nombre => {
            fetch(`${URL}/${nombre}`)
              .then(response => response.json())
              .then(data => mostrarPokemon(data))
              .catch(error => console.error(error));
          });
        }
      } else {
        for (let i = 1; i <= 20; i++) {
          fetch(`${URL}/${i}`)
            .then(response => response.json())
            .then(data => mostrarPokemon(data));
        }
      }
    }, 300);
    listaPokemon.innerHTML = '<p>Buscando...</p>';
  });
  

let nombresPokemon = [];

fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
  .then(response => response.json())
  .then(data => {
    nombresPokemon = data.results.map(p => p.name);
  });

/* Aquí comienza el modo oscuro */

