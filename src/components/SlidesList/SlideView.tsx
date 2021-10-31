import * as React from 'react';
import {ObjectType, Slide} from '../../script/slide/slide'
import {Objects} from "../SlideContent/Objects/Objects";

type Props = {
    slide: Slide,
    isScale: boolean
}

export function SlideView(props: Props)
{
    const slideObjects = props.slide.objects;

    return (
        <>
            {slideObjects.map((object: ObjectType) =>
                <Objects figure={object} isScale={props.isScale}/>
            )}
        </>
    );
}