import React from 'react';
import '../../style/block/workspace/workspace.css';
import '../../style/main.css';
import {SlideList} from "../SlidesList";
import {SlideContent} from "../SlideContent";
import {Editor} from "../../script/slide/slide";

type WorkspaceProps = Editor & {
    onSlideSelect(index: number): void;
}

export function Workspace(props: WorkspaceProps)
{
    const slidesCount = props.presentation.slides.length;

    return (
        <section className={'b-presentation__workspace'}>
            <div className={'b-presentation__workspace_primary'}>
                <SlideContent slide={props.presentation.slides[props.active]} isScale={false}/>
            </div>
            <div className={'b-presentation__workspace_secondary'}>
                <SlideList {...props}/>
            </div>
        </section>
    );
}