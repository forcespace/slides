import React from 'react';
import '../../style/block/workspace/workspace.css';
import '../../style/main.css';
import {SlideList} from "../SlidesList";
import {SlideContent} from "../SlideContent";

export function Workspace(props: any) {
    const {slides} = props;

    const [activeSlide, setActiveSlide] = React.useState(slides.active || 0);

    const slidesCount = slides.slide.length;

    return (
        <section className={'b-presentation__workspace'}>
            <div className={'b-presentation__workspace_primary'}>
                <SlideContent slide={slides.slide[activeSlide]} />
            </div>
            <div className={'b-presentation__workspace_secondary'}>
                <SlideList slides={slides.slide} onSlideClick={setActiveSlide} />
                {activeSlide + 1} of {slidesCount}
            </div>
        </section>
    );
};