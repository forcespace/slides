import * as React from 'react';
import {SlideView} from "../SlidesList/SlideView";
import '../../style/block/slide/slide.css';
import '../../style/main.css';
import {Slide} from '../../script/slide/slide'

type Props = {
    slide: Slide,
    isScale: boolean
}

export function SlideContent(props: Props) {
    return (
        <div className={'b-slide'}>
            <SlideView slide={props.slide} isScale={false}/>
        </div>
    );
}