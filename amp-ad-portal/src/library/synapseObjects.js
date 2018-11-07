export const synapseObjects = [
  {
    name: "Data",
    id: "syn12532774",
    filter: "diagnosis",
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

export const returnSynapseValue = (
  objectArray = synapseObjects,
  id,
  nameOfValue,
) => {
  const matchedObject = objectArray.filter(object => object.id === id)
  return matchedObject[0][nameOfValue]
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
