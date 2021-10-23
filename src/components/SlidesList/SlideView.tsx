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
            <div className={'b-slide__content'}>
                {objectsList.map((object: ObjectType) =>
                    <Objects {...object} />
                )}
            </div>
        </>
    );
}