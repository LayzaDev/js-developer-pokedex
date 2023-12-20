// Declaração de variaveis e atribuição de valores a elementos HTML e constantes
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151; // Carga de pokemons
const limit = 10; // limite de pokemons por carga
let offset = 0; // desvio

// Recebe um objeto pokemon e retorna uma string HTML formatada para representar esse Pokemon em uma lista
function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Carrega uma quantidade especifica de pokemons utilizando a pokeApi.getPokemons
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // Converte cada pokemon para HTML
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    // Adiciona o novo HTML ao conteúno existente da lista na página
    pokemonList.innerHTML += newHtml;
  });
}

// Utilizada para carregar os primeiros Pokemons na página
loadPokemonItens(offset, limit);

// Adiciona um ouvinte de evento no botão
loadMoreButton.addEventListener("click", () => {
  //Quando o botão for clicado o offset é incrementado
  offset += limit;

  // Verifica se após o incremento o numero total de registros com a próxima página ultrapassará o maximo de registros.
  const qtdRecordsWithNexPage = offset + limit;

  // Se ultrapassar a ultima página é carregada e o botão é removido. Caso contrario, a próxima página é carregada normalmente.
  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
