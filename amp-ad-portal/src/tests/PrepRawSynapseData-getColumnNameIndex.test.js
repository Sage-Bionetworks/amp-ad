import { getColumnNameIndex } from "../controller/PrepRawSynapseData"
import data from "../defaultData/response2"

describe("getColumnNameIndex", () => {
  describe("when given an array of column objects from synapse and a column name", () => {
    it("it returns the column name index value", () => {
      const startState = JSON.parse(data)

      // "diagnosis" is a column name
      // in the list of columns it's index value is 3
      const finState = getColumnNameIndex(startState, "diagnosis")

      expect(finState).toEqual(3)
    })
  })
})
