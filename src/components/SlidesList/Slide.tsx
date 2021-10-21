import * as React from 'react';
// import '../../style/block/slide/slide.css'
    import {Slide} from '../../script/slide/slide'

export function SlideView(props: Slide) {

    return (
        <>
            <span className={'b-slide-list__slide_count'}>{props.title}</span>
        </>
    );
}