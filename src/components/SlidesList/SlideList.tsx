import * as React from 'react';
import {SlideView} from "./Slide";
import '../../style/block/slide/slide-list.css';
import '../../style/main.css';
import {Slide} from '../../script/slide/slide'

// type Props = {
//     slide: Array<Slide>;
//     onSlideClick: (index: number) => void;
// };

export function SlideList(props: Slide[]) {
    return (
        <div className={'b-slide-list'}>
            {props.map((item: Slide, index: number) =>
                <div className={'b-slide-list__wrapper'}>
                    <SlideView {...item}/>
                    <div className={'b-slide-list__content'} key={index}>
                        <SlideView {...item}/>
                    </div>
                </div>
            )}
        </div>
    );
}