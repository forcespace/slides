import * as React from 'react';
import {SlideView} from "./SlideView";
import '../../style/block/slide/slide-list.css';
import '../../style/main.css';
import {Editor, Slide} from '../../script/slide/slide'
import {SlideNumber} from "./SlideNumber";

export function SlideList(props: Editor) {
    const temp: Array<Slide> = []
    props.presentation.slides.forEach((slide) => {
        temp.push(slide)
    })
    return (
        <div className={'b-slide-list'}>
            {temp.map((item: Slide) =>
                <div className={'b-slide-list__wrapper'}>
                    <div className={'b-slide-list__content'}>
                        <SlideView {...item}/>
                    </div>
                </div>
            )}
        </div>
    );
}