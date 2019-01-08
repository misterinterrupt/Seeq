import React, {Component} from 'react'
import Note from "./note.jsx"

export default class Phrases extends Component {

  renderNotes() {
    return (
      <React.Fragment>
        // render note list here
        <Note />
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="phraseGridContainer">
        {this.renderNotes()}
      </div>
    )
  }
}
