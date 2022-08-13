 

const pokemomName = document.querySelector('.pokemon_name');
const pokemomNumber = document.querySelector('.pokemon_number');
const pokemomImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnRandom = document.querySelector('.btn-random');

const btnUp = document.querySelector('.btn-up');
const btnDown = document.querySelector('.btn-down');
const btnLeft = document.querySelector('.btn-left');
const btnRigth = document.querySelector('.btn-rigth');


let searchPokemon = 1;
let position = ['front_default'];

const fetchPokemon = async (pokemon) => {
  
  const apiResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
  if(apiResponse.status === 200){
    const data = await apiResponse.json(); 
    return data;
  }
  
}

const renderPokemon = async (pokemon, position) => {
    pokemomName.innerHTML = 'Loading';
    pokemomNumber.innerHTML = '...';
  const data = await fetchPokemon(pokemon);
  if(data){
    if(data.id <= 649){
      pokemomName.innerHTML = data.name;
      pokemomNumber.innerHTML = data.id;
      pokemomImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][position]
      input.value = '';
      searchPokemon = data.id;
    } else{
      pokemomName.innerHTML = data.name;
      pokemomNumber.innerHTML = data.id;
      pokemomImage.src = data['sprites'][position]
      input.value = '';
      searchPokemon = data.id;
    }
  } else {
    pokemomName.innerHTML = 'Not found!';
    pokemomNumber.innerHTML = '000';
    pokemomImage.src ="https://c.tenor.com/fCvghb3z3MEAAAAi/pokemon-pikachu.gif"
    input.value = '';
    searchPokemon = 0;
  }


  };

  function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random()*(max-min)+min);
  };

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  position='front_default';
  renderPokemon(input.value.toLowerCase(), position);
  });

btnPrev.addEventListener('click',()=>{
   if(searchPokemon > 1){
    searchPokemon-=1
    position='front_default'
    renderPokemon(searchPokemon, position)
   }
    
  });
btnNext.addEventListener('click',()=>{
  searchPokemon+=1
  position='front_default'
  renderPokemon(searchPokemon, position)
    });



btnRandom.addEventListener('click',()=>{
  aleatorio = getRandomInt(1,899);
  position='front_default';
  renderPokemon(aleatorio, position);
    });

btnNext.addEventListener('click',()=>{
  searchPokemon+=1
  renderPokemon(searchPokemon, position)
});

btnLeft.addEventListener('click',()=>{
  position='back_default' 
  renderPokemon(searchPokemon, position)
});

btnRigth.addEventListener('click',()=>{
  position='front_default' 
  renderPokemon(searchPokemon, position)
});

btnUp.addEventListener('click',()=>{
  position='front_shiny' 
  renderPokemon(searchPokemon, position)
});

btnDown.addEventListener('click',()=>{
  position='back_shiny' 
  renderPokemon(searchPokemon, position)
});



renderPokemon(searchPokemon,position);