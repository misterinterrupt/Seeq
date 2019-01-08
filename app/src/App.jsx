import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';


var u = require('updeep');
import Patterns from "./components/patterns.jsx";
import Phrases from "./components/phrases.jsx";

const logger = createLogger();

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
      showPatterns: true,
      showPhrases: false
    }
  }

<<<<<<< HEAD
  handleMenuItemClick(label) {
    console.log(label + " clicked. " + this.state.showing[label]);
    let showing = {...this.state.showing, [label]: !this.state.showing[label]};
    this.setState({"showing":showing});
    console.log(this.state.showing[label]);
=======
  handleMenuItemClick(key) {
    let keyIndex = ["showPatterns", "showPhrases"];
    this.setState({[keyIndex[key]]: !this.state[keyIndex[key]]});
>>>>>>> Add patterns pane
  }

  renderMenuItem(label, key) {
    return  <MenuItem
              key={key}
              label={label}
              onClick={() => this.handleMenuItemClick(key)}
            />
  }

  renderPages() {
    return (
      <div className="Pages">
<<<<<<< HEAD
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
=======
        {this.state.showPatterns &&
          <Patterns />
        }
        {this.state.showPhrases &&
          <Phrases />
        }
<<<<<<< HEAD
        {this.state.showPhraseChains &&
          <PhraseChains />
        }
        {this.state.showFunctions &&
          <Functions />
        }
        {this.state.showAudioMatrix &&
>>>>>>> Add patterns pane
          <AudioMatrix />
        }
=======
>>>>>>> removing components that I am not working on and changing the structure of the app.
      </div>
    )
  }

  render() {
    return (
      <div>
        <aside>
          <div className="menu">
            {this.renderMenuItem("Patterns", 0)}
            {this.renderMenuItem("Phrases", 1)}
          </div>
        </aside>
        <main>
          {this.renderPages()}
        </main>
      </div>
    )
  }
}
