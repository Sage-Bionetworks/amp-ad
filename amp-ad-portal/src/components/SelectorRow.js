import React from "react"
import PropTypes from "prop-types"

const Selectors = (props) => {
  return (
    <div className="selectors">
      <button
        className={props.returnButtonClass("syn17024173")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn17024173",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>CONSORTIA</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17024229")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn17024229",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>PROJECTS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn9886254")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn9886254",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>STUDIES</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17024112")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn17024112",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>DATA</h5>
      </button>
      <button
        className={props.returnButtonClass("syn2580853")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn2580853",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>PUBLICATIONS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn13897207")}
        type="button"
        onClick={() => props.handleButtonPress(
          "syn13897207",
          undefined,
          props.synapseObject,
          props.handleChanges,
        )
        }
      >
        <h5>PEOPLE</h5>
      </button>
    </div>
  )
}

Selectors.propTypes = {
  handleChanges: PropTypes.func.isRequired,
  handleButtonPress: PropTypes.func.isRequired,
  returnButtonClass: PropTypes.func.isRequired,
  synapseObject: PropTypes.array.isRequired,
}

export default Selectors
