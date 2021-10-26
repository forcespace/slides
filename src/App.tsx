import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";

import './App.css';
import {editor} from "./script/slide/editor-new";
import {Footer} from "./components/Footer";


export function App(props: {editor : Editor}) {
    const [activeIndex, setActiveIndex] = React.useState(editor.active || 0);

    return (
        <div className={'b-presentation'}>
            <Header {...editor}/>
            <Workspace {...editor} active={activeIndex} onSlideSelect={setActiveIndex}/>
            <Footer activeIndex={activeIndex + 1} slidesCount={editor.presentation.slides.length} />
        </div>
    );
}