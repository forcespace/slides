import * as React from 'react';
import {Slide} from "../SlidesList/Slide";

type Props = {
    slide: any;
};

export function SlideContent(props: Props) {
    return (
        <div>
            <Slide content={props.slide}/>
        </div>
    );
};