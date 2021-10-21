import React from 'react';
import '../../style/block/workspace/workspace.css';
import '../../style/main.css';
import {SlideList} from "../SlidesList";
import {SlideContent} from "../SlideContent";

export function Workspace(props: any) {
    const {editor} = props;

    const [activeSlide, setActiveSlide] = React.useState(editor.active || 0);

    const slidesCount = editor.presentation.slides.length;

    return (
        <section className={'b-presentation__workspace'}>
            <div className={'b-presentation__workspace_primary'}>
                <SlideContent {...editor.presentation.slides[editor.active]} />
            </div>
            <div className={'b-presentation__workspace_secondary'}>
                <SlideList {...editor.presentation.slides}/>
                {activeSlide + 1} of {slidesCount}
            </div>
        </section>
    );
}