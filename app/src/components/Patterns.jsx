import React, {Component} from 'react'

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
  renderPatternBoxes(maxPatterns=32) {
    let patternBoxes = [];
    for(let i=0; i<0; i++) {
      patternBoxes.push(<PatternBox key={i}/>);
    }
    return (
      <React.Fragment>
      {patternBoxes}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="patternsPane">
        <div className="patternBoxesContainer">
          {this.renderPatternBoxes()}
        </div>
      </div>
    )
  }
}
