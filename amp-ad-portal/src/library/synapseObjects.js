export const synapseObjects = [
  {
    name: "consortia",
    id: "syn17024173",
    filter: "",
    color: 3,
    limit: 40,
    columns: 0,
    table: false,
    type: "STUDY",
    hash: "/Explore/Consortia",
  },
  {
    name: "projects",
    id: "syn17024229",
    filter: "Consortium",
    color: 4,
    limit: 0,
    columns: 9,
    table: false,
    type: "STUDY",
    hash: "/Explore/Projects",
  },
  {
    name: "studies",
    id: "syn9886254",
    filter: "Study_Type",
    color: 0,
    limit: 100,
    columns: 0,
    table: true,
    type: "STUDY",
    hash: "/Explore/Studies",
  },
  {
    name: "data",
    id: "syn17024112",
    filter: "study",
    color: 1,
    limit: 50,
    columns: 0,
    table: true,
    type: "DATASET",
    hash: "/Explore/Data",
  },
  {
    name: "publications",
    id: "syn2580853",
    wikiId: "409850",
    filter: "",
    color: 5,
    limit: 40,
    columns: 0,
    table: false,
    type: "PUBLICATION",
    hash: "/Explore/Publications",
  },
  {
    name: "people",
    id: "syn13897207",
    filter: "institution",
    color: 2,
    limit: 40,
    columns: 0,
    table: true,
    type: "PUBLICATION",
    hash: "/Explore/People",
  },
  {
    name: "",
    id: "studyPage",
    filter: "",
    color: 0,
    limit: 0,
    columns: 0,
    table: false,
    type: "",
    hash: "/Studies/",
  },
]

export const synapseClinicalTable = [
  {
    name: "Diagnosis",
    id: "syn17024112",
    filter: "diagnosis",
    color: 1,
    limit: 0,
    columns: 0,
    table: true,
    type: "",
    hash: "/Explore/Data",
  },
  {
    name: "Organism",
    id: "syn17024112",
    filter: "species",
    color: 1,
    limit: 0,
    columns: 0,
    table: true,
    type: "",
    hash: "/Explore/Data",
  },
  {
    name: "Data Type",
    id: "syn17024112",
    filter: "dataType",
    color: 1,
    limit: 0,
    columns: 0,
    table: true,
    type: "",
    hash: "/Explore/Data",
  },
  {
    name: "Assay",
    id: "syn17024112",
    filter: "assay",
    color: 1,
    limit: 0,
    columns: 0,
    table: true,
    type: "",
    hash: "/Explore/Data",
  },
  {
    name: "Tissue",
    id: "syn17024112",
    filter: "tissue",
    color: 1,
    limit: 0,
    columns: 0,
    table: true,
    type: "",
    hash: "/Explore/Data",
  },
]

Array.prototype.clone = function () {
  return JSON.parse(JSON.stringify(this))
}

// given a key balue pair this function
// returns the searchKey value from the object with the
// matching the key value pair
export const returnSynapseValue = (
  objectArray = synapseObjects,
  key,
  keyValue,
  searchKey,
) => {
  const matchedObject = objectArray.filter(object => object[key] === keyValue)
  //console.log(key, keyValue, matchedObject)
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
