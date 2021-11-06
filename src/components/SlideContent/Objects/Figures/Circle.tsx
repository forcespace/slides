import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Circle(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const topSvg: number = props.figure.leftTopPoint.x
    const leftSvg: number = props.figure.leftTopPoint.y
    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? (props.figure.border.borderSize * scaleIndex) : 0

    const styleSvg = {top: `'${topSvg}px'`, left: `'${leftSvg}px'`, fill: fillColorSvg, stroke: strokeColorSvg, strokeWidth: strokeSizeSvg}

    const widthSvg = props.figure.width * scaleIndex
    const heightSvg = props.figure.height * scaleIndex
    const xCircle = props.figure.leftTopPoint.x * scaleIndex
    const yCircle = props.figure.leftTopPoint.y * scaleIndex
    const widthCircle = props.figure.width * scaleIndex * 0.5 + xCircle
    const heightCircle = props.figure.height * scaleIndex * 0.5 + yCircle
    const radiusCircle = props.figure.height * scaleIndex * 0.5

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <circle cx={widthCircle} cy={heightCircle} r={radiusCircle}/>
        </svg>
    )
}