import * as React from 'react'
import {SlideView} from "./SlideView"
import '../../style/block/slide/slide-list.css'
import '../../style/main.css'
import {Editor, Slide} from '../../script/slide/slide'
// import {SlideNumber} from "./SlideNumber";

type SlideListProps = Editor & {
    onSlideSelect(index: number): void;
}

export function SlideList(props: SlideListProps)
{
    // const slideList: Array<Slide> = []
    // props.presentation.slides.forEach((slide) => {
    //     slideList.push(slide)
    // })

    const {slides} = props.presentation;

    return (
        <div className={'b-slide-list'}>
            {slides.map((slide: Slide, index: number) =>
                <div className={'b-slide-list__wrapper'}>
                    <div className={'b-slide-list__content'} onClick={() => props.onSlideSelect(index)}>
                        <SlideView slide={slide} isScale={true}/>
                    </div>
                    <span className={'b-slide-list__slide_count'}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    );
}