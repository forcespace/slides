import * as React from 'react';
import {Slide} from "./Slide";
import '../../style/block/slide/slide-list.css';
import '../../style/main.css';

type Props = {
    slides: any;
    onSlideClick: (index: number) => void;
};

export function SlideList(props: Props) {
    return (
        <div className={'b-slide-list'}>
            {props.slides.map((item: any, index: number) =>
                <div className={'b-slide-list__wrapper'}>
                    <Slide content={item}/>
                    <div className={'b-slide-list__content'} onClick={() => props.onSlideClick(index)} key={item.id}>
                        <Slide content={item}/>
                    </div>
                </div>
            )}
        </div>
    );
}