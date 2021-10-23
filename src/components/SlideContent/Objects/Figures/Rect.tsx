import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

export function Rect(props: ObjectType) {
    return (
        <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg">
            <rect x={props.leftTopPoint.x} y={props.leftTopPoint.y} width={props.width} height={props.height} stroke={props.border?.borderColor} fill={props.background?.color}/>
        </svg>
    )

}