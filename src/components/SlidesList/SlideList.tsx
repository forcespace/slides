import * as React from 'react';
import {SlideView} from "./SlideView";
import {Editor, Slide} from '../../script/slide/slide';
import {dispatch} from "../../dispatch";
import {setActive} from "../../script/slide/functions";
import '../../style/block/slide/slide-list.css';
import '../../style/main.css';


export function SlideList(props: Editor) {
    const active = props.active;
    const slides: Slide[] = props.presentation.slides;

    function isActive(index: number)
    {
        return index === active
    }

    function setActiveSlide(index: number)
    {
        dispatch(setActive, index)
    }

    return (
        <div className={'b-slide-list'}>
            {slides.map((slide: Slide, index: number) =>
                <div className={'b-slide-list__item'}>
                    <div className={`b-slide-list__content${isActive(index) ? " b-slide-list__content_active" : ""}`} onClick={() => setActiveSlide(index)}>
                        <SlideView slide={slide} isScale={true}/>
                    </div>
                    <span className={'b-slide-list__slide_count'}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    )
}