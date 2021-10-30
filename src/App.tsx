import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";
import {Footer} from "./components/Footer";

import './App.css';

import {Editor} from "./script/slide/slide"

export function App(props: {editor: Editor}) {

    return (
        <div className={'b-presentation'}>
            <Header {...props.editor} />
            <Workspace {...props.editor} />
            <Footer {...props.editor} />
        </div>
    );
}