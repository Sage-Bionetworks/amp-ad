export const synapseObjects = [
  {
    name: "funder",
    id: "syn16858699",
    filter: "",
    color: 0,
    limit: 3,
    columns: 0,
    table: false,
    type: "FUNDER",
    hash: "/Explore/Funder",
  },
  {
    name: "datasets",
    id: "syn16859580",
    filter: "diseaseFocus",
    color: 5,
    limit: 40,
    columns: 0,
    table: false,
    type: "DATASET",
    hash: "/Explore/Datasets",
  },
  {
    name: "files",
    id: "syn16858331",
    filter: "assay",
    color: 8,
    limit: 0,
    columns: 7,
    table: true,
    type: "",
    hash: "/Explore/Files",
  },
  {
    name: "studies",
    id: "syn16787123",
    filter: "diseaseFocus",
    color: 1,
    limit: 100,
    columns: 0,
    table: false,
    type: "STUDY",
    hash: "/Explore/Studies",
  },
  {
    name: "analysis",
    id: "",
    filter: "",
    color: 0,
    limit: 0,
    columns: 9,
    table: true,
    type: "",
    hash: "/Explore/Analysis",
  },
  {
    name: "publications",
    id: "syn16857542",
    filter: "diseaseFocus",
    color: 0,
    limit: 40,
    columns: 0,
    table: false,
    type: "PUBLICATION",
    hash: "/Explore/Publications",
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
  console.log(key, keyValue, matchedObject)
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
