import React from "react"
import PropTypes from "prop-types"
import { returnSynapseValue } from "../library/synapseObjects"

const Selectors = (props) => {
  const handleButtonPress = (value, key = "id") => {
    const activeFilter = returnSynapseValue(
      props.synapseObject,
      key,
      value,
      "filter",
    )
    const color = returnSynapseValue(props.synapseObject, key, value, "color")
    const hash = returnSynapseValue(props.synapseObject, key, value, "hash")
    const name = returnSynapseValue(props.synapseObject, key, value, "name")

    props.handleChanges({
      activeId: value,
      activeFilter,
      color,
      hash,
      name,
    })
    return ""
  }

  return (
    <div className="selectors">
      <button
        className={props.returnButtonClass("syn17024173")}
        type="button"
        onClick={() => handleButtonPress("syn17024173")}
      >
        <h5>CONSORTIA</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17024229")}
        type="button"
        onClick={() => handleButtonPress("syn17024229")}
      >
        <h5>PROJECTS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn9886254")}
        type="button"
        onClick={() => handleButtonPress("syn9886254")}
      >
        <h5>STUDIES</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17024112")}
        type="button"
        onClick={() => handleButtonPress("syn17024112")}
      >
        <h5>DATA</h5>
      </button>
      <button
        className={props.returnButtonClass("syn2580853")}
        type="button"
        onClick={() => handleButtonPress("syn2580853")}
      >
        <h5>PUBLICATIONS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn13897207")}
        type="button"
        onClick={() => handleButtonPress("syn13897207")}
      >
        <h5>PEOPLE</h5>
      </button>
    </div>
  )
}

Selectors.propTypes = {
  handleChanges: PropTypes.func.isRequired,
  returnButtonClass: PropTypes.func.isRequired,
  synapseObject: PropTypes.array.isRequired,
}

export default Selectors
