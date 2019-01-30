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

// ui component for boxes that represent each section
class SectionBox extends Component {

  render() {
    return (
      <div className="sectionBox" />
    );
  }
}

// ui component for sections section, shows
export default class Sections extends Component {

    // render boxes that represent the sections in this section
  renderSectionBoxes(maxSections=32) {
    let sectionBoxes = [];
    for(let i=0; i<0; i++) {
      sectionBoxes.push(<SectionBox key={i}/>);
    }
    return (
      <React.Fragment>
      {sectionBoxes}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="sectionsPane">
        <div className="sectionBoxesContainer">
          {this.renderSectionBoxes()}
        </div>
      </div>
    )
  }
}
