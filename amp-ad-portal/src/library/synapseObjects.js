export const synapseObjects = [
  {
    name: 'Programs',
    description: 'Programs',
    id: 'syn17024173',
    filter: '',
    offlineKey: 'syn17024173',
    color: 3,
    limit: 0,
    columns: 0,
    barChart: false,
    cards: true,
    menu: false,
    type: 'AMP_CONSORTIUM',
    hash: '/Explore/Programs',
    sql: 'SELECT * FROM syn17024173',
  },
  {
    name: 'Projects',
    description: 'Projects',
    id: 'syn17024229',
    filter: 'Program',
    color: 4,
    limit: 0,
    columns: 9,
    cards: false,
    menu: true,
    barChart: false,
    facets: false,
    type: 'AMP_PROJECT',
    hash: '/Explore/Projects',
    sql: 'SELECT * FROM syn17024229',
    menuConfig: [
      {
        sql: 'SELECT * FROM syn17024229',
        synapseId: 'syn17024229',
        unitDescription: 'projects',
        facetName: 'Program',
      },
    ],
  },
  {
    name: 'studies',
    description: 'Studies',
    id: 'syn17083367',
    barChart: false,
    cards: false,
    menu: true,
    type: 'AMP_STUDY',
    sql: 'SELECT * FROM syn17083367',
    filter: 'Species',
    menuConfig: [
      {
        sql: 'SELECT * FROM syn17083367',
        synapseId: 'syn17083367',
        facetName: 'Species',
        facetDisplayValue: 'Species',
        unitDescription: 'studies',
      },
      {
        sql: 'SELECT * FROM syn17083367',
        synapseId: 'syn17083367',
        facetName: 'Grant',
        unitDescription: 'studies',
      },
      {
        sql: 'SELECT * FROM syn17083367',
        synapseId: 'syn17083367',
        facetName: 'Consortium',
        facetDisplayValue: 'Program',
        unitDescription: 'studies',
      },
    ],
    limit: 100,
    columns: 0,
    color: 0,
    hash: '/Explore/Studies',
  },
  {
    name: 'data',
    description: 'Data Files',
    id: 'syn11346063',
    filter: 'study',
    color: 1,
    limit: 50,
    columns: 0,
    cards: false,
    type: '',
    hash: '/Explore/Data',
    sql: 'SELECT * FROM syn11346063',
    menu: true,
    menuConfig: [
      {
        sql:
          'SELECT study, dataType, assay, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
        title: 'Data',
        synapseId: 'syn11346063',
        facetName: 'study',
        facetDisplayValue: 'Study',
        unitDescription: 'data files',
        visibleColumnCount: 4,
      },
      {
        sql:
          'SELECT species, dataType, id as file_id, consortium as program, grant, study, organ, tissue, cellType, assay, fileFormat, specimenID FROM syn11346063',
        title: 'Data',
        synapseId: 'syn11346063',
        facetName: 'species',
        facetDisplayValue: 'Species',
        unitDescription: 'data files',
        visibleColumnCount: 3,
      },
      {
        sql:
          'SELECT organ, tissue, dataType, assay, id AS file_id, consortium as program, grant, study, species, cellType, specimenID FROM syn11346063',
        title: 'Data',
        synapseId: 'syn11346063',
        facetName: 'organ',
        facetDisplayValue: 'Organ',
        unitDescription: 'data files',
        visibleColumnCount: 5,
      },
      {
        sql:
          'SELECT dataType, assay, study, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
        title: 'Data',
        synapseId: 'syn11346063',
        facetName: 'dataType',
        facetDisplayValue: 'Data Type',
        unitDescription: 'data files',
        visibleColumnCount: 4,
      },
      {
        sql:
          'SELECT assay, fileFormat, id AS file_id, consortium as program, grant, study, species, organ, tissue, cellType, dataType, specimenID FROM syn11346063',
        title: 'Data',
        synapseId: 'syn11346063',
        facetName: 'assay',
        facetDisplayValue: 'Assay',
        unitDescription: 'data files',
        visibleColumnCount: 4,
      },
      {
        sql:
          'SELECT diagnosis, sex, dataType, assay, id as file_id, consortium as program, grant, study, species, organ, tissue, cellType, fileFormat, specimenID, anonymized_individualID FROM syn17024112',
        title: 'Data',
        synapseId: 'syn17024112',
        facetName: 'diagnosis',
        facetDisplayValue: 'Diagnosis',
        unitDescription: 'data files',
        visibleColumnCount: 5,
      },
    ],
  },
  {
    name: 'publications',
    description: 'Publications',
    id: 'syn2580853',
    wikiId: '409850',
    filter: '',
    color: 5,
    limit: 40,
    columns: 0,
    cards: false,
    type: 'PUBLICATION',
    hash: '/Explore/Publications',
    sql: 'SELECT * FROM syn2580853',
  },
  {
    name: 'people',
    description: 'people',
    id: 'syn13897207',
    filter: 'Program',
    color: 2,
    limit: 100,
    columns: 10,
    barChart: false,
    cards: false,
    type: '',
    hash: '/Explore/People',
    sql: 'SELECT * FROM syn13897207',
    menu: true,
    menuConfig: [
      {
        sql:
          "select firstName as \"First Name\", lastName as \"Last Name\", institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: 'People',
        synapseId: 'syn13897207',
        facetName: 'Program',
        unitDescription: 'people',
      },
      {
        sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: 'People',
        synapseId: 'syn13897207',
        facetName: 'Grant Number',
        unitDescription: 'people',
      },
      {
        sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: 'Institution',
        synapseId: 'syn13897207',
        facetName: 'institution',
        facetDisplayValue: 'Institution',
        unitDescription: 'people',
      },
    ],
  },
]

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// given a key value pair this function
// returns the searchKey value from the object with the
// matching the key value pair
export const returnSynapseValue = (
  objectArray = synapseObjects,
  key,
  keyValue,
  searchKey,
) => {
  const matchedObject = objectArray.filter(object => object[key] === keyValue)
  return matchedObject[0][searchKey]
}

export const returnSynapseObject = (synObjects = synapseObjects, idVal) => {
  const matchedObject = synObjects.filter(object => object.id === idVal)
  return matchedObject[0]
}

export const setSynapseValue = (
  objectArray = synapseObjects,
  id,
  key,
  newValue,
) => {
  objectArray.forEach((object) => {
    if (object.id === id) {
      object[key] = newValue
    }
  })
}
