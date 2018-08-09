import {
  filterRowsByKeyAndValue,
  keysToValues,
} from "../controller/PrepRawSynapseData"
import testData from "../defaultData/response2"

// sample input
// [
// {species: "Human", assay: null, tissue: null, diagnoses: "Parkinson's Disease", specimenID: null, …}
// {species: null, assay: null, tissue: "amygdala", diagnoses: null, specimenID: null, …}
// {species: null, assay: null, tissue: "anterior cingulate cortex", diagnoses: null, specimenID: null, …}
// {species: null, assay: null, tissue: "caudate nucleus", diagnoses: null, specimenID: null, …}
// ]

describe("filterRowsByKeyAndValue", () => {
  describe("when given an array of objects, and a key, and an array of values", () => {
    it("returns a filtered array of objects with only the objects that contain the defined values in that key", () => {
      const startState = keysToValues(
        JSON.parse(testData).queryResult.queryResults.rows,
      )
      const filterKey = "tissue"
      const filterValue = ["caudate nucleus", "anterior cingulate cortex"]
      const finState = filterRowsByKeyAndValue(
        startState,
        filterValue,
        filterKey,
      )

      expect(finState).toEqual(expectedOutput)
    })
  })
})

const expectedOutput = [
  {
    assay: null,
    count: 1,
    dataType: "1",
    diagnoses: null,
    species: null,
    specimenID: null,
    tissue: "anterior cingulate cortex",
  },
  {
    assay: null,
    count: 1,
    dataType: "1",
    diagnoses: null,
    species: null,
    specimenID: null,
    tissue: "caudate nucleus",
  },
  {
    assay: "rnaArray",
    count: 1,
    dataType: "1",
    diagnoses: null,
    species: null,
    specimenID: null,
    tissue: "anterior cingulate cortex",
  },
  {
    assay: "rnaArray",
    count: 41,
    dataType: "41",
    diagnoses: "Alzheimer's Disease",
    species: "Human",
    specimenID: "50491hg133a11",
    tissue: "anterior cingulate cortex",
  },
  {
    assay: "rnaArray",
    count: 27,
    dataType: "27",
    diagnoses: "control",
    species: "Human",
    specimenID: "51294hg133a11",
    tissue: "anterior cingulate cortex",
  },
  {
    assay: "rnaArray",
    count: 54,
    dataType: "54",
    diagnoses: "other",
    species: "Human",
    specimenID: "35035hg133a11",
    tissue: "anterior cingulate cortex",
  },
  {
    assay: "rnaArray",
    count: 1,
    dataType: "1",
    diagnoses: null,
    species: null,
    specimenID: null,
    tissue: "caudate nucleus",
  },
  {
    assay: "rnaArray",
    count: 40,
    dataType: "40",
    diagnoses: "Alzheimer's Disease",
    species: "Human",
    specimenID: "50455hg133a11",
    tissue: "caudate nucleus",
  },
  {
    assay: "rnaArray",
    count: 16,
    dataType: "16",
    diagnoses: "control",
    species: "Human",
    specimenID: "43366hg133a11",
    tissue: "caudate nucleus",
  },
  {
    assay: "rnaArray",
    count: 48,
    dataType: "48",
    diagnoses: "other",
    species: "Human",
    specimenID: "50447hg133a31",
    tissue: "caudate nucleus",
  },
]
