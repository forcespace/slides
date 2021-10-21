import * as React from 'react';
import {SlideView} from "../SlidesList/Slide";
import '../../style/block/slide/slide.css';
import '../../style/main.css';
import {Slide} from '../../script/slide/slide'

export function SlideContent(props: Slide) {
    return (
        <div className={'b-slide'}>
            <SlideView {...props}/>
        </div>
    );
}