export const orderData = (arrPokemon, orderType) => {
  const order = {
    "max-smaller-cp": function () { return arrPokemon.sort((a, b) => (b['stats']["max-cp"]) - (a['stats']["max-cp"])) },
    "smaller-max-cp": function () { return arrPokemon.sort((a, b) => (a['stats']["max-cp"]) - (b['stats']["max-cp"])) },
    "name-az": function () {
      return arrPokemon.sort((a, b) => {
        if (a['name'] > b['name']) {
          return 1
        }
        if (a['name'] < b['name']) {
          return -1
        }
      })
    },
    "name-za": function () {
      return arrPokemon.sort((a, b) => {
        if (a['name'] > b['name']) {
          return -1
        }
        if (a['name'] < b['name']) {
          return 1
        }
      })
    },
    "num": function () { return arrPokemon.sort((a, b) => (a['num']) - (b['num'])) },
    "spawn-chance": function () { return arrPokemon.sort((a, b) => (b['spawn-chance']) - (a['spawn-chance'])) },
    "weaknesses": function () { return arrPokemon.sort((a, b) => (a['weaknesses'].length) - (b['weaknesses'].length)) }
  }
  return order[orderType]()
}

export const filterByType = (data, selectFilter) =>
  data.filter((pokemon) => pokemon.type.includes(selectFilter))

export const typeName = (data, inputLetterName) => {
  return (data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(inputLetterName.toLowerCase())
  ))
}

export const createPropertyArr = (arrPokemon, statusPokemon) => {
  let arrWithAllStatus = []
  let arr = arrPokemon.map((pokemon) => pokemon[statusPokemon])
  arrWithAllStatus = arr.flat()
  return arrWithAllStatus
}

export const createArrWithoutRepeat = (arrWithAllStatus) => {
  //eslint-disable-next-line
  const arrWithoutRepeat = [...new Set(arrWithAllStatus)]
  return arrWithoutRepeat
}

export const percentOfProperty = (arrWithAllStatus, arrWithoutRepeat, arrPokemon) => {
  const sum = {}
  let qtd = 0
  for (let status of arrWithoutRepeat) {
    qtd = 0
    for (var i = 0; i < arrWithAllStatus.length; i++) {
      if (arrWithAllStatus[i] === status) qtd++
    }
    let percent = ((qtd / arrPokemon.length) * 100).toFixed([2])
    sum[status] = { qtd, percent, status }
  }
  return sum
}

export const showSumArr = (onePokemon, statusPokemon, sum, arrWithoutRepeat) => {
  let arrReturn = []
  arrWithoutRepeat.forEach(function (status) {
    if (typeof (onePokemon[statusPokemon]) == 'object') {
      for (let type of onePokemon[statusPokemon]) {
        if (type === status) {
          arrReturn.push(sum[status])
        }
      }
    } else {
      if (onePokemon[statusPokemon] === status) {
        arrReturn = [sum[status]]
      }
    }
  })
  return arrReturn
}
