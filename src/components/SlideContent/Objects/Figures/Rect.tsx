import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Rect(props: Props)
{
    const styleSvg = {top: `'${props.figure.leftTopPoint.x}px'`, left: `'${props.figure.leftTopPoint.y}px'`}
    const scaleIndex = props.isScale ? 0.17 : 1
    const widthSvg = props.figure.width * scaleIndex
    const heightSvg = props.figure.height * scaleIndex
    const xRect = props.figure.leftTopPoint.x * scaleIndex
    const yRect = props.figure.leftTopPoint.y * scaleIndex
    const widthRect = widthSvg
    const heightRect = heightSvg
    const rectStroke = props.figure.border ? props.figure.border.borderColor : ''
    const rectFill = props.figure.background ? props.figure.background.color : ''

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={xRect} y={yRect} width={widthRect} height={heightRect} stroke={rectStroke} fill={rectFill}/>
        </svg>
    )
}