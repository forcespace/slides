import * as React from 'react';
import {ObjectType, Position} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Triangle(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const widthSvg = Math.round(props.figure.width * scaleIndex)
    const heightSvg = Math.round(props.figure.height * scaleIndex)
    const xSvg = Math.round(props.figure.leftTopPoint.x * scaleIndex)
    const ySvg = Math.round(props.figure.leftTopPoint.y * scaleIndex)

    const styleSvg = {
        top: `${xSvg}px`,
        left: `${ySvg}px`,
        width: widthSvg,
        height: heightSvg
    }

    const v1: Position = {
        x: Math.round(widthSvg / 2),
        y: 0
    }

    const v2: Position = {
        x: 0,
        y: heightSvg
    }

    const v3: Position = {
        x: widthSvg,
        y: heightSvg
    }

    const trianglePath = `M ${v1.x} ${v1.y} L ${v2.x} ${v2.y} L ${v3.x} ${v3.y} Z`

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <path d={trianglePath} stroke={props.figure.border?.borderColor} fill={props.figure.background?.color}/>
        </svg>
    )
}