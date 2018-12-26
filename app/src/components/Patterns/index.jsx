import React, {Component} from 'react'
import styles from './styles.css'

class FunctionButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className={this.props.className}>
        {this.props.label}
      </button>
    )
  }
}

// ui component for boxes that represent each pattern
class PatternBox extends Component {

  render() {
    return (
      <div className="patternBox" />
    );
  }
}

// ui component for patterns section, shows
export default class Patterns extends Component {

    // render boxes that represent the patterns in this pattern
  renderPatternBoxes() {
    return (
      <React.Fragment>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
        <PatternBox/>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="patternsPane">
        <div className="patternBoxesContainer">
          {this.renderPatternBoxes()}
        </div>
        <div className="patternsFunctionsContainer">
          <FunctionButton className="addPatternBtn" label="Add Pattern" />
        </div>

      </div>
    )
  }
}
