import React from 'react';
import {presentation} from './../src/script/slide/editor'
import './App.css';

type presentationTest = {
    title: string;
}


function title(props: presentationTest) {
    return <span>{props.title}</span>
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <title>{presentation.title}</title>
      </header>
      <div id="toolbars" className="toolbar">
          <button className="btn"></button>
      </div>
      <div id="docs-editor" className="companion-enabled">
        <div id="two-panel-layout" className="two-panel-layout">
            <div id="sidebar" className="filmstrip">
                <div id="slide" className="slide"></div>
            </div>
              <div id="workspace-container" className="workspace-container">
                <div id="slide-view" className="slide-view">

                </div>
              </div>
        </div>
      </div>

    </div>
  );
}

export default App;
