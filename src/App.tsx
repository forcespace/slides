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
        <div id="docs-editor" className="companion-enabled">
            <div id="two-panel-layout" className="two-panel-layout">
                <div id="sidebar" className="filmstrip">
                    <CanvasContainer  width={200} height={200} />
                </div>
                <div id="workspace-container" className="workspace-container">
                    <div id="slide-view" className="slide-view">
                        <CanvasContainer width={500} height={300}/>
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
