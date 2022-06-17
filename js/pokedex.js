import './nav.js'
import data from '../data/pokemon/pokemon.js'
import {
  apearBigCardPokemon,
  optionTypesHtml,
  smallCardPokemon
} from './content.js'

import {
  filterByType,
  orderData,
  typeName,
  createPropertyArr,
  createArrWithoutRepeat,
  percentOfProperty,
  showSumArr
} from "./data.js"

const pokemon = data.pokemon
const selectOrder = document.querySelector('#select-order')
const inputSearch = document.getElementById('input-search')

let filterTypes = document.querySelector('#type')
let sectionCardsPokemon = document.querySelector("[data-section]")
let cardSmall = document.getElementById('card-pokemon')
let showPokemonBig = document.getElementById('card-pokemon-big')

optionTypesHtml(pokemon, filterTypes)

smallCardPokemon(pokemon, cardSmall)

let arrPokemon = []
let arrPokemonOrder = []

inputSearch.addEventListener("change", () => {
  arrPokemonOrder = []
  selectOrder.value = 'none'
  filterTypes.value = 'filter'
  for (let i = 0; i < inputSearch.value.length; i++) {
    arrPokemon = typeName(data.pokemon, inputSearch.value)
    if (arrPokemon.length == 0) {
      cardSmall.textContent = "Not found! Verify the name and try again."
    }
    else {
      smallCardPokemon(arrPokemon, cardSmall)
    }
  }

  if (inputSearch.value == "") {
    arrPokemon = []
    arrPokemonOrder = []
    smallCardPokemon(pokemon, cardSmall)
  }
})

filterTypes.addEventListener("change", () => {
  arrPokemon = []
  arrPokemonOrder = []
  if (filterTypes.value !== "") {
    if (filterTypes.value === "filter") {
      smallCardPokemon(pokemon, cardSmall)
    } else {
      smallCardPokemon((filterByType(data.pokemon, filterTypes.value)), cardSmall)
      arrPokemon = filterByType(data.pokemon, filterTypes.value)
    }
  } else {
    smallCardPokemon(pokemon, cardSmall)
  }
})

selectOrder.addEventListener("change", (e) => {
  arrPokemonOrder = []
  let changeOrder = e.target.value
  if (changeOrder === 'none') {
    smallCardPokemon(orderData(data.pokemon, "num"), cardSmall)
  } else if (arrPokemon.length === 0 && changeOrder !== 'none') {
    arrPokemonOrder = orderData(data.pokemon, changeOrder)
    smallCardPokemon(arrPokemonOrder, cardSmall)
  } else {
    arrPokemonOrder = orderData(arrPokemon, changeOrder)
    smallCardPokemon(arrPokemonOrder, cardSmall)
  }
})

sectionCardsPokemon.addEventListener("click", (e) => {
  let extensionW = window.screen.width
  const { target } = e;
  const dataItem = target.dataset.item
  if (dataItem) {
    let onePokemon = []

    if (arrPokemon.length === 0 && arrPokemonOrder.length === 0) {
      onePokemon = pokemon[Number(dataItem)]
    } else if (arrPokemon.length !== 0 && arrPokemonOrder.length === 0) {
      onePokemon = arrPokemon[Number(dataItem)]
    } else if (arrPokemon.length !== 0 && arrPokemonOrder.length !== 0) {
      onePokemon = arrPokemonOrder[Number(dataItem)]
    } else if (arrPokemon.length === 0 && arrPokemonOrder !== 0) {
      onePokemon = arrPokemonOrder[Number(dataItem)]
    }

    apearBigCardPokemon(showPokemonBig, onePokemon)
    const arrWithAllStatus = createPropertyArr(pokemon, "type")
    const arrWithoutRepeat = createArrWithoutRepeat(arrWithAllStatus)
    const sum = percentOfProperty(arrWithAllStatus, arrWithoutRepeat, pokemon)
    const sumProperty = showSumArr(onePokemon, "type", sum, arrWithoutRepeat)

    const arrWithAllStatusRarity = createPropertyArr(pokemon, "pokemon-rarity")
    const arrWithoutRepeatRarity = createArrWithoutRepeat(arrWithAllStatus)
    const sumRarity = percentOfProperty(arrWithAllStatusRarity, arrWithoutRepeatRarity, pokemon)
    const sumPropertyRarity = showSumArr(onePokemon, "pokemon-rarity", sumRarity, arrWithoutRepeatRarity)

    for (let line of sumProperty) {
      showPokemonBig.insertAdjacentHTML('beforeend', `
      <div class="pattern">
        <p class="paragraph-big"><b>Number of ${line.status} pokemons: ${line.qtd}</b></p>
        <p class="paragraph-big"><b>Percentage of ${line.status} pokemons: ${line.percent}%</b></p>
      </div>`
      )
    }

    for (let line of sumPropertyRarity) {
      showPokemonBig.insertAdjacentHTML('beforeend', `
      <div class="pattern">
        <p class="paragraph-big"><b>Number of ${line.status} pokemons: ${line.qtd}</b></p>
        <p class="paragraph-big"><b>Percentage of ${line.status} pokemons: ${line.percent}%</b></p>
      </div>`
      )
    }

  }
  if (extensionW <= 600) {
    window.scrollTo(0, 1000)
  }
})
