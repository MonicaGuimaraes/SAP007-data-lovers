import {
  createPropertyArr,
  percentOfProperty,
  createArrWithoutRepeat
} from "./data.js"
import './nav.js'

async function catchData() {
  const arrResponse = await fetch("./data/pokemon/pokemon.json")
  const arrResponse1 = await arrResponse.json()
  return await arrResponse1.pokemon
}

function generateColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

async function graphics(featurePokemon, element) {
  try {
    const pokemon = await catchData()
    const propertyArrfeature = createPropertyArr(pokemon, featurePokemon)
    const arrWithoutRepeatfeature = createArrWithoutRepeat(propertyArrfeature)
    const statusDatafeature = percentOfProperty(propertyArrfeature, arrWithoutRepeatfeature, pokemon)

    let arrLabels = []
    let arrColors = []
    let arrQtd = []

    for (let statusfeature in statusDatafeature) {
      arrLabels.push(statusDatafeature[statusfeature].status)
      arrColors.push(generateColor())
      arrQtd.push(statusDatafeature[statusfeature].qtd)
    }

    const data = {
      labels: arrLabels,
      datasets: [{
        label: `${featurePokemon} Pokémon`,
        data: arrQtd,
        backgroundColor: arrColors,
        hoverOffset: 4
      }]
    };

    const config = {
      type: 'pie',
      data: data
    }

    new Chart(
      element,
      config
    )
  }
  catch (e) {
    document.getElementById('error').textContent = 'An error occurred, please try later!'
  }
}

graphics('type', document.getElementById('myChart').getContext('2d'))
graphics('pokemon-rarity', document.getElementById('myChart2').getContext('2d'))
