import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    scaleIndex: number
}

export function Rect(props: Props)
{
    const widthSvg = Math.ceil(props.figure.width * props.scaleIndex)
    const heightSvg = Math.ceil(props.figure.height * props.scaleIndex)
    const xSvg = Math.ceil(props.figure.leftTopPoint.x * props.scaleIndex)
    const ySvg = Math.ceil(props.figure.leftTopPoint.y * props.scaleIndex)

    const styleSvg = {
        top: `${xSvg}px`,
        left: `${ySvg}px`,
        width: widthSvg,
        height: heightSvg
    }

    const rectStroke = props.figure.border ? props.figure.border.borderColor : ''
    const rectFill = props.figure.background ? props.figure.background.color : ''

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={0} y={0} width={widthSvg} height={heightSvg} stroke={rectStroke} fill={rectFill}/>
        </svg>
    )
}