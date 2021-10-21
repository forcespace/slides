import * as React from 'react';
import {Slide} from "../SlidesList/Slide";
import '../../style/block/slide/slide.css';
import '../../style/main.css';

type Props = {
    slide: any;
};

export function SlideContent(props: Props) {
    return (
        <div className={'b-slide'}>
            <Slide content={props.slide}/>
        </div>
    );
}