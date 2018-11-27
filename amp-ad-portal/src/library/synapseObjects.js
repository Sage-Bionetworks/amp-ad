export const synapseObjects = [
  {
    name: "programs",
    description: "",
    id: "syn17024173",
    filter: "",
    color: 3,
    limit: 40,
    columns: 0,
    table: false,
    type: "STUDY",
    hash: "/Explore/Programs",
    sql: "SELECT * FROM syn17024173",
  },
  {
    name: "projects",
    description: "",
    id: "syn17024229",
    filter: "",
    color: 4,
    limit: 0,
    columns: 9,
    table: false,
    type: "STUDY",
    hash: "/Explore/Projects",
    sql: "SELECT * FROM syn17024229",
  },
  {
    name: "studies",
    description: "",
    id: "syn9886254",
    filter: "Study_Type",
    color: 0,
    limit: 100,
    columns: 0,
    table: true,
    type: "STUDY",
    hash: "/Explore/Studies",
    sql: "SELECT * FROM syn9886254",
  },
  {
    name: "data",
    description: "",
    id: "syn17024112",
    filter: "study",
    color: 1,
    limit: 50,
    columns: 0,
    table: true,
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
    type: "PUBLICATION",
    hash: "/Explore/Publications",
    sql: "SELECT * FROM syn2580853",
  },
  {
    name: "people",
    description: "",
    id: "syn13897207",
    filter: "institution",
    color: 2,
    limit: 40,
    columns: 0,
    table: true,
    type: "PUBLICATION",
    hash: "/Explore/People",
    sql: "SELECT * FROM syn13897207",
  },
  {
    name: "",
    description: "",
    id: "studyPage",
    filter: "",
    color: 0,
    limit: 0,
    columns: 0,
    table: false,
    type: "",
    hash: "/Studies/",
    sql: "SELECT * FROM syn13897207",
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
