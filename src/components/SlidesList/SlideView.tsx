import * as React from 'react';
import {ObjectType, Slide} from '../../script/slide/slide'
import {Objects} from "../SlideContent/Objects/Objects";

export function SlideView(props: Slide) {
    const objectsList: Array <ObjectType> = []
    props.objects.forEach((object) => {
        objectsList.push(object)
    })
    return (
        <>
            <span className={'b-slide-list__slide_count'}>{props.title}</span>
            {objectsList.map((object: ObjectType) =>
                <Objects {...object} />
            )}
        </>
    );
}