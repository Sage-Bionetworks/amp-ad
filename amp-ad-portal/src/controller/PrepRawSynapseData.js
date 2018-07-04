const filterBySpecies = (dataObject, species) => {
  // takes raw synapse json data as input
  const selection = dataObject.queryResult.queryResults.rows.filter(
    element => element.values[0] === species,
  )
  return selection
}

const filterRowsByDataType = (filteredRows, species, key) => {
  const flattennedRows = filteredRows.map((element) => {
    let index
    if (key === "assay") {
      index = 1
    }
    if (key === "tissue") {
      index = 2
    }
    if (key === "diagnoses") {
      index = 3
    }
    return {
      species,
      name: element.values[index],
      count: parseInt(element.values[5], 10),
    }
  })
  return flattennedRows
}

const filterRowsByKeyAndValue = (dataRows, valuesArray, key) => {
  return dataRows.filter((row) => {
    return valuesArray.some((value) => {
      return value === row[key]
    })
  })
}

const filterByValue = (dataObject, keys) => {
  // keys must be an array of values
  // dataObject is raw synapse data
  const filters = keys
  let selections
  if (dataObject.queryResult !== undefined) {
    selections = dataObject.queryResult.queryResults.rows
  }
  if (dataObject.queryResult === undefined) {
    selections = dataObject
  }
  return selections.filter(row => row.values.some((values) => {
    return filters.includes(values)
  }))
}

const keysToValues = (rows) => {
  return rows.map((row) => {
    return {
      species: row.values[0],
      assay: row.values[1],
      tissue: row.values[2],
      diagnoses: row.values[3],
      specimenID: row.values[4],
      count: parseInt(row.values[5], 10),
    }
  })
}

const filterByKey = (dataObject, key) => {
  // takes in raw synapse data
  let index
  if (key === "assay") {
    index = 1
  }
  if (key === "tissue") {
    index = 2
  }
  if (key === "diagnoses") {
    index = 3
  }
  const selection = dataObject.queryResult.queryResults.rows
  return selection.filter(row => row.values[index] !== null)
}

const onlyUnique = (value, index, self) => self.indexOf(value) === index

const reduceCountsByKey = (countsListArray, key) => {
  // create list of unique value and count objects
  const namesList = countsListArray.map(element => element[key])
  const uniqueNames = namesList.filter(onlyUnique)
  let totalCount
  let species
  let assay
  let tissue
  let diagnoses
  let specimenID
  let base64Link
  let table

  const namesAndCountsTotaled = uniqueNames.map((uniqueName) => {
    totalCount = 0
    countsListArray.forEach((element) => {
      if (uniqueName === element[key]) {
        totalCount += element.count
        species = element.species
        assay = element.assay
        tissue = element.tissue
        diagnoses = element.diagnoses
        specimenID = element.specimenID
        base64Link = element.base64Link
        table = element.table
      }
    })
    return {
      species,
      assay,
      tissue,
      diagnoses,
      specimenID,
      count: totalCount,
      base64Link,
      table,
    }
  })

  return namesAndCountsTotaled
}

const countBioSamples = (rows) => {
  // takes in processed rows
  // counts unique specimenID
  const counts = {}
  rows.forEach((row) => {
    counts[row.specimenID] = 1 + (counts[row.specimenID] || 0)
  })
  return Object.keys(counts).length
}

const setBase64Link = (dataTypesArray) => {
  dataTypesArray.map((element) => {
    //console.log(element)
    let sqlQuery
    if (
      element.species === "allspecies"
      || element.species === "All species"
      || element.species === null
    ) {
      sqlQuery = `SELECT * FROM syn12532774 WHERE (("assay" = '${
        element.assay
      }'))`
    } else {
      sqlQuery = `SELECT * FROM syn12532774 WHERE ( ( "species" = '${
        element.species
      }') AND ("assay" = '${element.assay}'))`
    }
    //console.log(sqlQuery)

    let base64Link = {
      sql: sqlQuery,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 25,
    }
    base64Link = JSON.stringify(base64Link)
    element.base64Link = btoa(base64Link)
    element.table = "syn12532774"
    return element
  })
  return dataTypesArray
}

const printNames = (objectArray, key) => {
  return objectArray.map((element) => {
    return element[key]
  })
}

const gatherCounts = (dataResponse, species, dataType) => {
  //const filteredByValue = filterByValue(dataResponse)
  //console.log(filteredByValue)
  //const speciesArray = filterBySpecies(dataResponse, species)
  //const speciesDataType = filterByKey(speciesArray, species, dataType)
  // console.log(speciesDataType)
  //const counts = setBase64Link(reduceCounts(speciesDataType))
  //return counts
}

export {
  gatherCounts,
  reduceCountsByKey,
  filterRowsByDataType,
  filterRowsByKeyAndValue,
  filterByValue,
  filterBySpecies,
  filterByKey,
  keysToValues,
  printNames,
  setBase64Link,
  countBioSamples,
}
