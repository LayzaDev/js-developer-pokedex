const pokeApi = {}; // objeto vazio que será usado para armazenar as funções relacionadas à API Pokémon

// responsável por converter os detalhes da API Pokémon em um objeto Pokémon personalizado
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon(); // instancia do objeto Pokemon (pokemon-model.js)

  // Atribuindo valores com base nos detalhes fornencidos pela API
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  // About
  pokemon.species = pokeDetail.species.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.abilities = pokeDetail.abilities.map((ability) => ability.name);

  // Base Stats (Estatisticas)
  pokemon.hp = pokemon.stats.map((baseStat) => baseStat);
  return pokemon; // retorna o objeto Pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  // Recebe um objeto pokemon contendo uma URL
  return fetch(pokemon.url) // faz a requisição à API Pokemin para obter os detalhes
    .then((response) => response.json()) // converte a resposta para JSON
    .then(convertPokeApiDetailToPokemon); // Chama a função para transformar os detalhes em um objeto pokemon
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  // Cria uma URL com base nos parâmetros offset e limit
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) // Faz uma requisição à API Pokémon
    .then((response) => response.json()) // Converte a resposta JSON para obter a lista de resultados.
    .then((jsonBody) => jsonBody.results) // Obtem a lista de resultados
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia essa lista usando a função getPokemonDetail para obter os detalhes de cada Pokémon.
    .then((detailRequests) => Promise.all(detailRequests)) // Usa Promise.all para aguardar que todas as requisições detalhadas sejam concluídas.
    .then((pokemonsDetails) => pokemonsDetails); //Retorna a lista completa de detalhes de Pokémon.
};
