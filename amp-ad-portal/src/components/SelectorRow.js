import React from "react"
import PropTypes from "prop-types"

const Selectors = (props) => {
  const hideOnHome = () => {
    const hideBool = window.location.hash === "#/" ? "none" : "block"
    return { display: hideBool }
  }

  return (
    <div className="selectors">
      <button
        className={props.returnButtonClass("syn17024173")}
        type="button"
        style={hideOnHome()}
        onClick={() => props.handleButtonPress("syn17024173", props.handleChanges)
        }
      >
        <h5>PROGRAMS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17024229")}
        type="button"
        onClick={() => props.handleButtonPress("syn17024229", props.handleChanges)
        }
      >
        <h5>PROJECTS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn17083367")}
        type="button"
        onClick={() => props.handleButtonPress("syn17083367", props.handleChanges)
        }
      >
        <h5>STUDIES</h5>
      </button>
      <button
        className={props.returnButtonClass("syn11346063")}
        type="button"
        onClick={() => props.handleButtonPress("syn11346063", props.handleChanges)
        }
      >
        <h5>DATA</h5>
      </button>
      <button
        className={props.returnButtonClass("syn2580853")}
        type="button"
        style={hideOnHome()}
        onClick={() => props.handleButtonPress("syn2580853", props.handleChanges)
        }
      >
        <h5>PUBLICATIONS</h5>
      </button>
      <button
        className={props.returnButtonClass("syn13897207")}
        type="button"
        onClick={() => props.handleButtonPress("syn13897207", props.handleChanges)
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
}

export default Selectors
