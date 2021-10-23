import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {Rect} from "./Figures/Rect";

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Objects(props: Props) {
    if(props.figure.type === 'Rect') {
        return (
            <Rect figure={props.figure} isScale={props.isScale}/>)
    }
    else {
        return (
            <> </>
        )
    }
}