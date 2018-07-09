import { filterByKey } from "../controller/PrepRawSynapseData"

const data = {
  queryResult: {
    queryResults: {
      headers: [
        {
          columnType: "STRING",
          name: "species",
        },
        {
          columnType: "STRING",
          name: "assay",
        },
        {
          columnType: "STRING",
          name: "tissue",
        },
        {
          columnType: "STRING",
          name: "diagnosis",
        },
        {
          columnType: "STRING",
          name: "specimenID",
        },
        {
          columnType: "INTEGER",
          name: "COUNT(*)",
        },
      ],
      rows: [
        {
          values: [null, null, null, null, null, "137"],
        },
        {
          values: ["Human", null, null, null, null, "340"],
        },
        {
          values: ["Human", null, null, "Alzheimer's Disease", null, "1167"],
        },
      ],
    },
  },
}

describe("filterByKey", () => {
  describe("when given the raw synapse json output and a data key", () => {
    it("it returns an array of rows that only contain data of that key. rows that contain null value at that key are omitted", () => {
      const startState = data

      const finState = filterByKey(startState, "diagnosis")

      const expectedOutput = [
        {
          values: ["Human", null, null, "Alzheimer's Disease", null, "1167"],
        },
      ]
      expect(finState).toEqual(expectedOutput)
    })
  })
})
