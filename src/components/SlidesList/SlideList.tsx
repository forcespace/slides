import * as React from 'react';
import {SlideView} from "./SlideView";
import '../../style/block/slide/slide-list.css';
import '../../style/main.css';
import {Editor, Slide} from '../../script/slide/slide'
import {SlideNumber} from "./SlideNumber";

export function SlideList(props: Editor) {
    const slideList: Array<Slide> = []
    props.presentation.slides.forEach((slide) => {
        slideList.push(slide)
    })
    return (
        <div className={'b-slide-list'}>
            {slideList.map((slide: Slide) =>
                <div className={'b-slide-list__wrapper'}>
                    <div className={'b-slide-list__content'}>
                        <SlideView slide={slide} isScale={true}/>
                    </div>
                </div>
            )}
        </div>
    );
}