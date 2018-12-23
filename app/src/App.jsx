import React, {Component} from 'react'
import {render} from 'react-dom'
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
    console.log(label + " clicked");
    this.state.showing[label] = !this.state.showing[label];
    console.log(this.state.showing);
  }

  renderMenuItem(label) {
    return  <MenuItem
              label={label}
              onClick={() => this.handleMenuItemClick(label)}
            />
  }

  renderPages(showing) {
    return (
      <div className="Pages">
        {showing["Patterns"] &&
          <Patterns />
        }
        {showing["Phrases"] &&
          <Phrases />
        }
        {showing["Phrase Chains"] &&
          <PhraseChains />
        }
        {showing["Functions"] &&
          <Functions />
        }
        {showing["Audio Matrix"] &&
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
          {this.renderPages(this.state.showing)}
        </main>
      </div>
    )
  }
}
