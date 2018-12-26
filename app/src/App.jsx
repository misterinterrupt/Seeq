import React, {Component} from 'react'
import {render} from 'react-dom'
var u = require('updeep');
import Patterns from "./components/Patterns/"
import Phrases from "./components/Phrases/"
import PhraseChains from "./components/PhraseChains/"
import Functions from "./components/Functions/"
import AudioMatrix from "./components/AudioMatrix/"

function MenuItem(props) {
  return <a href="#"
            className="page"
            onClick={props.onClick}
          >
          {props.label}
          </a>
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showing : {
        "Patterns":true,
        "Phrases":false,
        "Phrase Chains": false,
        "Functions": false,
        "Audio Matrix": false
      }
    }
  }

  handleMenuItemClick(label) {
    console.log(label + " clicked. " + this.state.showing[label]);
    let showing = {...this.state.showing, [label]: !this.state.showing[label]};
    this.setState({"showing":showing});
    console.log(this.state.showing[label]);
  }

  renderMenuItem(label) {
    return  <MenuItem
              label={label}
              onClick={() => this.handleMenuItemClick(label)}
            />
  }

  renderPages() {
    return (
      <div className="Pages">
        {this.state.showing["Patterns"] &&
          <Patterns />
        }
        {this.state.showing["Phrases"] &&
          <Phrases />
        }
        {this.state.showing["Phrase Chains"] &&
          <PhraseChains />
        }
        {this.state.showing["Functions"] &&
          <Functions />
        }
        {this.state.showing["Audio Matrix"] &&
          <AudioMatrix />
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <aside>
          <div className="menu">
            {this.renderMenuItem("Patterns")}
            {this.renderMenuItem("Phrases")}
            {this.renderMenuItem("Phrase Chains")}
            {this.renderMenuItem("Functions")}
            {this.renderMenuItem("Audio Matrix")}
          </div>
        </aside>
        <main>
          {this.renderPages()}
        </main>
      </div>
    )
  }
}
