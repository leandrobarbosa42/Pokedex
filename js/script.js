const pokemomName = document.querySelector('.pokemon_name');
const pokemomNumber = document.querySelector('.pokemon_number');
const pokemomImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  
  const apiResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if(apiResponse.status === 200){
    const data = await apiResponse.json(); 
    return data;
  }
  
}

const renderPokemon = async (pokemon) => {
    pokemomName.innerHTML = 'Loading';
    pokemomNumber.innerHTML = '...';
  const data = await fetchPokemon(pokemon);
  
  if(data){
    pokemomName.innerHTML = data.name;
    pokemomNumber.innerHTML = data.id;
    pokemomImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = '';
    searchPokemon = data.id;
  }else{
    pokemomName.innerHTML = 'Not found!';
    pokemomNumber.innerHTML = '000';
    pokemomImage.src ="https://c.tenor.com/fCvghb3z3MEAAAAi/pokemon-pikachu.gif"
    input.value = '';
    searchPokemon = 0;
  }

};

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  });

btnPrev.addEventListener('click',()=>{
   if(searchPokemon > 1){
    searchPokemon-=1
    renderPokemon(searchPokemon)
   }
    
  });
btnNext.addEventListener('click',()=>{
  searchPokemon+=1
  renderPokemon(searchPokemon)
    });

renderPokemon(searchPokemon);