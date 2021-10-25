import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Rect(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const widthSvg = props.figure.width * scaleIndex
    const heightSvg = props.figure.height * scaleIndex
    const xRect = props.figure.leftTopPoint.x * scaleIndex
    const yRect = props.figure.leftTopPoint.y * scaleIndex
    const widthRect = widthSvg
    const heightRect = heightSvg

    return (
        <svg className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={xRect} y={yRect} width={widthRect} height={heightRect} stroke={props.figure.border?.borderColor} fill={props.figure.background?.color}/>
        </svg>
    )
}