import React from 'react';
import '../../style/block/workspace/workspace.css';
import '../../style/main.css';
import {SlideList} from "../SlidesList";
import {SlideContent} from "../SlideContent";
import {Editor} from "../../script/slide/slide";

export function Workspace(props: Editor) {
    const [activeSlide, setActiveSlide] = React.useState(props.active || 0);

    const slidesCount = props.presentation.slides.length;

    return (
        <section className={'b-presentation__workspace'}>
            <div className={'b-presentation__workspace_primary'}>
                <SlideContent slide={props.presentation.slides[props.active]} isScale={false}/>
            </div>
            <div className={'b-presentation__workspace_secondary'}>
                <SlideList {...props}/>
                {activeSlide + 1} of {slidesCount}
            </div>
        </section>
    );
}