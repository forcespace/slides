import React from 'react';
import './style/block/workspace/workspace.css';
import './style/main.css';
import './script/slide/editor'
import {editor} from "./script/slide/editor";
import {Editor} from "./script/slide/slide";
// import {createEditor} from "./script/slide/functions";

function GetSlide() {

    let temp: Array<string> = []
    editor.presentation.slides.slide.forEach((slide) => {
        slide.texts.forEach((text) => {
            temp.push(text.content)
        })
    })

    const listText = temp.map((task) =>
        <div>{task}</div>
    );
    return (
        <div>{listText}</div>
    );
}

function Workspace() {
    // const editor : Editor = createEditor()

    return (
        <section className={'b-presentation__workspace'}>
            <div className={'b-presentation__workspace_primary'}>
                <GetSlide />
            </div>
            <div className={'b-presentation__workspace_secondary'}>
                <GetSlide />
            </div>
        </section>
    );
}

export {
    Workspace
}