import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {Rect} from "./Figures/Rect";

export function Objects(props: ObjectType) {
    if(props.type === 'Rect') {
        return (
            <Rect {...props} />)
    }
    else {
        return (
            <> </>
        )
    }
}