import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

export function Rect(props: ObjectType) {
    const viewB = `${props.leftTopPoint.x} ${props.leftTopPoint.y} ${props.width} ${props.height}`
    return (
        <svg viewBox={viewB} xmlns="http://www.w3.org/2000/svg">
            <rect width={props.width} height={props.height} />
        </svg>
    )

}