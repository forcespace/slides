import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";

import './App.css';
import {editor} from "./script/slide/editor";


export function App() {
    const presentation = editor.presentation;

    return (
        <div className={'b-presentation'}>
            <Header title={presentation.title}/>
            <Workspace slides={presentation.slides}/>
        </div>
    );
}