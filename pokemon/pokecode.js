//Reusable function to fetch data
async function getAPIData(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
     console.error(error)
    }}

//cards loading with names
function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=0`).then
    //console.log(apiResults)
    (async (data) => {
        for(const pokemon of data.results) {
            await getAPIData(pokemon.url).then((pokeData) => {
            populatePokeCard(pokeData)
        })
    }
    })
}

const pokemonGrid = document.querySelector('.pokemonGrid')

function populatePokeCard(pokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })

    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))

    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div')
    cardFront.className = `card__face card__face--front`
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    frontLabel.textContent = pokemon.name
    frontImage.src = `./images/${getImageFileName(pokemon)}.png`
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}


function populateCardBack(pokemon){
    let cardBack = document.createElement('div')
    cardBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('h3')
    backLabel.textContent = 'Abilities:'
    let abilityList = document.createElement('ul')
    pokemon.abilities.forEach(ability => {
        let abilityName = document.createElement('li')
        abilityName.textContent = ability.ability.name
        abilityList.appendChild(abilityName)
    })
    cardBack.appendChild(backLabel)
    cardBack.appendChild(abilityList)

    return cardBack
}


function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id < 99) {
        return `0${pokemon.id}`
    }
}

loadPage()

//theme song music player functions

document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;

play.addEventListener('click', () => {
    player.play();
})

pause.addEventListener('click', () => {
    player.pause();
})

vol.addEventListener('click', () => {
    player.volume=document.getElementById("vol").value;
})
function startplayer() 
{
 player = document.getElementById('music_player');
 player.controls = false;
}

