import * as React from 'react';
import {ObjectType, Position} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Triangle(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const widthSvg = props.figure.width * scaleIndex
    const heightSvg = props.figure.height * scaleIndex
    const v1: Position = {
        x: (props.figure.leftTopPoint.x + props.figure.width / 2) * scaleIndex,
        y: props.figure.leftTopPoint.y * scaleIndex
    }

    const v2: Position = {
        x: props.figure.leftTopPoint.x * scaleIndex,
        y: (props.figure.leftTopPoint.y + props.figure.height) * scaleIndex
    }

    const v3: Position = {
        x: (props.figure.leftTopPoint.x + props.figure.width) * scaleIndex,
        y: (props.figure.leftTopPoint.y + props.figure.height) * scaleIndex
    }

    const trianglePath = `M ${v1.x} ${v1.y} L ${v2.x} ${v2.y} L ${v3.x} ${v3.y} Z`

    return (
        <svg xmlns="http://www.w3.org/2000/svg">
            <path d={trianglePath} stroke={props.figure.border?.borderColor} fill={props.figure.background?.color}/>
        </svg>
    )
}