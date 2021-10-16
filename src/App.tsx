import React from 'react';
import {editor} from './script/slide/editor'
import './App.css';
import {CanvasContainer} from './CanvasContainer'

function App() {
    return (
    <div className="App">
        <header>
            <div>
                <input className="title" value={editor.presentation.title}/>
            </div>
        </header>
        <div id="toolbars" className="toolbar">
            <button className="btn">Кнопка</button>
        </div>
        <div id="docs-editor" className="companion-enabled">
            <div id="two-panel-layout" className="two-panel-layout">
                <div id="sidebar" className="filmstrip">
                    <div id="slide" className="slide">
                        <CanvasContainer />
                    </div>
                </div>
                <div id="workspace-container" className="workspace-container">
                    <div id="slide-view" className="slide-view">
                        <CanvasContainer />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export {
    App
}
