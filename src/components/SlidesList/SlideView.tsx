import * as React from 'react';
import {ObjectType, Slide} from '../../script/slide/slide'
import {Objects} from "../SlideContent/Objects/Objects";

type Props = {
    slide: Slide,
    isScale: boolean
}

export function SlideView(props: Props) {
    const objectsList: Array <ObjectType> = []
    props.slide.objects.forEach((object) => {
        objectsList.push(object)
    })
    return (
        <>
            <div className={'b-slide__content'}>
                {objectsList.map((object: ObjectType) =>
                    <Objects figure={object} isScale={props.isScale}/>
                )}
            </div>
        </>
    );
}