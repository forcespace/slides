import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";

import './App.css';
// import {editor} from "./script/slide/editor-new";
import {Footer} from "./components/Footer";
import {Editor} from "./script/slide/slide";


type AppProps = {
    editor: Editor;
}

export function App(props: AppProps) {
    const {editor} = props;

    // const activeIndex = editor.active;
    // function setActiveIndex(index: number) {
    //     dispatch(, index);
    // }

    return (
        <div className={'b-presentation'}>
            <Header {...editor}/>
            <Workspace {...editor} />
            <Footer {...editor} />
        </div>
    );
}