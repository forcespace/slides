import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Rect(props: Props)
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

    const rectStroke = props.figure.border ? props.figure.border.borderColor : ''
    const rectFill = props.figure.background ? props.figure.background.color : ''

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={0} y={0} width={widthSvg} height={heightSvg} stroke={rectStroke} fill={rectFill}/>
        </svg>
    )
}