const filterBySpecies = (dataObject, species) => {
  // takes raw synapse json data as input
  const selection = dataObject.queryResult.queryResults.rows.filter(
    element => element.values[0] === species,
  )
  return selection
}

const filterCounts = (filteredRows, species, dataType) => filteredRows.map((element) => {
  let index
  if (dataType === "assay") {
    index = 1
  }
  return {
    species,
    name: element.values[index],
    count: parseInt(element.values[5], 10),
  }
})

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const reduceCounts = (countsListArray) => {
  // create list of unique value and count objects
  const namesList = countsListArray.map(element => element.name)
  const uniqueNames = namesList.filter(onlyUnique)
  let totalCount
  let species

  const namesAndCountsTotaled = uniqueNames.map((uniqueName) => {
    totalCount = 0
    countsListArray.forEach((element) => {
      if (uniqueName === element.name) {
        totalCount += element.count
        species = element.species
      }
    })
    return {
      species,
      name: uniqueName,
      count: totalCount,
      base64Link: "",
    }
  })

  return namesAndCountsTotaled
}

const setBase64Link = (dataTypesArray) => {
  dataTypesArray.map((element) => {
    let sqlQuery
    if (element.species === "allspecies" || element.species === "All species") {
      sqlQuery = `SELECT * FROM syn12532774 WHERE (("assay" = '${
        element.name
      }'))`
    } else {
      sqlQuery = `SELECT * FROM syn12532774 WHERE ( ( "species" = '${
        element.species
      }') AND ("assay" = '${element.name}'))`
    }

    let base64Link = {
      sql: sqlQuery,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 25,
    }
    base64Link = JSON.stringify(base64Link)
    element.base64Link = btoa(base64Link)
    return element
  })
  return dataTypesArray
}

const gatherCounts = (dataResponse, species, dataType) => {
  const speciesArray = filterBySpecies(dataResponse, species)
  const speciesAssay = filterCounts(speciesArray, species, dataType)
  const counts = setBase64Link(reduceCounts(speciesAssay))
  return counts
}

export {
  gatherCounts, reduceCounts, filterCounts, filterBySpecies,
}
