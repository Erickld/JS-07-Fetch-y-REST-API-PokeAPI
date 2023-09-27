//Fetch
//

////--------------------PETICION GET
const BASE_URL = 'https://pokeapi.co/api/v2/';

//fetch no async
// fetch(BASE_URL + 'pokemon/ditto')
//     .then(res => res.json())
//     .then(data => console.log(data));


//fetch async
const fetchPokemon = async (pokemon) => {
    try {
        // const response = await fetch(BASE_URL + 'pokemon/ditto');
        // const parsedResponse = response.json();
        // return parsedResponse;
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;

    } catch (err) {
        alert('Pokemon not found!!');
        console.log(err);
    }
}




const initialFuction = async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    localStorage.setItem('currentPokeId', pokemon.id);
    document.getElementById('poke-name').value = pokemon.name;
    localStorage.setItem('pokemonInfo', JSON.stringify(pokemon));
    setPokemonCard();
}

if (document.readyState !== 'loading') {
    initialFuction()    
} else {
    //Evento que se ejecuta cuando el DOM se ha cargado completamente
    document.addEventListener('DOMContentLoaded', initialFuction)
}

//obtener el pokemon con input y boton
document.getElementById('get-btn').addEventListener('click', async () => {
    let text = document.getElementById('poke-name').value.toLowerCase();
    text = text ? text : 1;
    const pokemon = await fetchPokemon(text);  
    console.log(pokemon);
    //memorias storage: guardar informacion en la memoria del navegador.
    //sesion storage: memoria que se resetea cada que se reinicia el navegador. 
    //local storage: memoria mas persistente, se establece un tiempo.
    localStorage.setItem('currentPokeId', pokemon.id);
    document.getElementById('poke-name').value = pokemon.name;
    localStorage.setItem('pokemonInfo', JSON.stringify(pokemon));
    setPokemonCard();
});


//obtener el pokemon anterior
document.getElementById('previous-btn').addEventListener('click', async () => {
    const currentPokeId = localStorage.getItem('currentPokeId');
    const newId = Math.max(1, parseInt(currentPokeId)-1);
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name)
    localStorage.setItem('currentPokeId', pokemon.id);
    document.getElementById('poke-name').value = pokemon.name;
    localStorage.setItem('pokemonInfo', JSON.stringify(pokemon));
    setPokemonCard();
});

//obtener el pokemon siguiente
document.getElementById('next-btn').addEventListener('click', async () => {
    const currentPokeId = localStorage.getItem('currentPokeId');
    const newId = parseInt(currentPokeId)+1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name)
    localStorage.setItem('currentPokeId', pokemon.id);
    document.getElementById('poke-name').value = pokemon.name;
    localStorage.setItem('pokemonInfo', JSON.stringify(pokemon));
    setPokemonCard();
});

function setPokemonCard() {
    let pokeInfo = localStorage.getItem('pokemonInfo');
    pokeInfo = JSON.parse(pokeInfo);
    document.getElementById('poke-img-front').src = pokeInfo.sprites.front_default;
    document.getElementById('poke-img-back').src = pokeInfo.sprites.back_default;
    document.getElementById('poke-name-card').textContent = pokeInfo.name;
    document.getElementById('poke-id').textContent = pokeInfo.id;
    document.getElementById('poke-weight').textContent = `${ (parseInt(pokeInfo.weight)*0.1).toFixed(2) } kg`;
    

    //types
    let types = "";
    pokeInfo.types.forEach(element => {
        types += `<li>${element.type.name}</li>`;
    });
    document.getElementById('poke-types').innerHTML = types;
    //abilities
    let habilidades = "";
    pokeInfo.abilities.forEach(element => {
        habilidades += `<li>${element.ability.name}</li>`;
    });
    document.getElementById('poke-abilities').innerHTML = habilidades;
    //show pokemon card
    document.getElementById('poke-card').style.display = 'inline-block';
}

//----------------------PETICION POST
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'title1',
//         body: 'Lorem ipsum dolor sit amet',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     }
// }).then(res => res.json()).then(json => console.log(json))