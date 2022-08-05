const pokemomName = document.querySelector('.pokemon_name');
const pokemomNumber = document.querySelector('.pokemon_number');
const pokemomImage = document.querySelector('.pokemon_image');

const fetchPokemon = async (pokemon) => {
  
  const apiResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await apiResponse.json(); 

  return data;
}

const renderPokemon = async (pokemon) => {

  const data = await fetchPokemon(pokemon);
  pokemomName.innerHTML = data.name;
  pokemomNumber.innerHTML = data.id;
  pokemomImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

};


renderPokemon('25')