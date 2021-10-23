import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";

import './App.css';
import {editor} from "./script/slide/editor-new";
import {Footer} from "./components/Footer";


export function App() {

    return (
        <div className={'b-presentation'}>
            <Header {...editor}/>
            <Workspace {...editor}/>
            <Footer/>
        </div>
    );
}