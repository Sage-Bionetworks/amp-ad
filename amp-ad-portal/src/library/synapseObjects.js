export const synapseObjects = [
  {
    name: "Programs",
    description: "Programs",
    id: "syn17024173",
    filter: "",
    color: 3,
    limit: 0,
    columns: 0,
    table: false,
    barChart: false,
    cards: true,
    type: "AMP_CONSORTIUM",
    menu: false,
    hash: "/Explore/Programs",
    sql: "SELECT * FROM syn17024173",
  },
  {
    name: "Projects",
    description: "",
    id: "syn17024229",
    filter: "Program",
    color: 4,
    limit: 0,
    columns: 9,
    table: false,
    cards: true,
    type: "AMP_PROJECT",
    barChart: true,
    menu: false,
    menuConfig: [
      {
        sql: "SELECT * FROM syn9886254",
        title: "",
        synapseId: "syn9886254",
        facetName: "",
        unitDescription: "",
      },
    ],
    hash: "/Explore/Projects",
    sql: "SELECT * FROM syn17024229",
  },
  {
    name: "studies",
    description: "",
    id: "syn9886254",
    table: false,
    barChart: true,
    cards: true,
    type: "AMP_STUDY",
    menu: false,
    menuConfig: [
      {
        sql: "SELECT * FROM syn9886254",
        title: "",
        synapseId: "syn9886254",
        facetName: "",
        unitDescription: "",
      },
    ],
    limit: 100,
    columns: 0,
    filter: "Study_Type",
    color: 0,
    hash: "/Explore/Studies",
    sql: "SELECT * FROM syn9886254",
  },
  {
    name: "data",
    description: "",
    id: "syn17024112",
    filter: "study",
    menu: true,
    menuConfig: [
      {
        sql:
          "SELECT diagnosis, sex, dataType as \"data type\", assay, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112 GROUP BY diagnosis,2,3,4 ORDER BY diagnosis, 2, 3, 4",
        title: "Diagnosis",
        synapseId: "syn17024112",
        facetName: "diagnosis",
        unitDescription: "diagnoses",
      },
      {
        sql:
          "SELECT species, isModelSystem, dataType, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112 GROUP BY 1,2,3 ORDER BY 1,2,3",
        title: "species",
        synapseId: "syn17024112",
        facetName: "species",
        unitDescription: "species",
      },
      {
        sql:
          "SELECT study, dataType, assay, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112 group by 1,2,3 order by 1,2,3",
        title: "study",
        synapseId: "syn17024112",
        facetName: "study",
        unitDescription: "studies",
      },
      {
        sql:
          "SELECT dataType as \"Data Type\", assay, study, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112 GROUP BY 1,2,3 ORDER BY 1,2,3",
        title: "data type",
        synapseId: "syn17024112",
        facetName: "dataType",
        unitDescription: "data types",
      },
      {
        sql:
          "SELECT assay, fileFormat, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112  group by 1,2 order by 1,2",
        title: "assay",
        synapseId: "syn17024112",
        facetName: "assay",
        unitDescription: "assays",
      },
      {
        sql:
          "SELECT organ, tissue, dataType, assay, count(distinct anonymized_individualID) AS individuals, count(id) AS files FROM syn17024112 group by 1,2,3,4 order by 1,2,3,4",
        title: "organ",
        synapseId: "syn17024112",
        facetName: "organ",
        unitDescription: "organs",
      },
    ],
    color: 1,
    limit: 50,
    columns: 0,
    table: true,
    cards: false,
    type: "DATASET",
    hash: "/Explore/Data",
    sql: "SELECT * FROM syn17024112",
  },
  {
    name: "publications",
    description: "",
    id: "syn2580853",
    wikiId: "409850",
    filter: "",
    color: 5,
    limit: 40,
    columns: 0,
    table: false,
    cards: false,
    type: "PUBLICATION",
    hash: "/Explore/Publications",
    sql: "SELECT * FROM syn2580853",
  },
  {
    name: "people",
    description: "the people of AMP-AD",
    id: "syn13897207",
    filter: "institution",
    color: 2,
    limit: 100,
    columns: 10,
    table: true,
    barChart: false,
    cards: false,
    type: "",
    hash: "/Explore/People",
    sql: "SELECT * FROM syn13897207",
    menu: true,
    menuConfig: [
      {
        sql:
          "select firstName as \"First Name\", lastName as \"Last Name\", institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: "Program",
        synapseId: "syn13897207",
        facetName: "Program",
        unitDescription: "programs",
      },
      {
        sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: "Grant Number",
        synapseId: "syn13897207",
        facetName: "Grant Number",
        unitDescription: "grants",
      },
      {
        sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        title: "institution",
        synapseId: "syn13897207",
        facetName: "institution",
        unitDescription: "institutions",
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
