import * as React from 'react';
import {Text} from '../../../../script/slide/slide'

type Props = {
    text: Text,
    scaleIndex: number
}

export function TextSvg(props: Props)
{
    const widthSvg = Math.ceil(props.text.width * props.scaleIndex)
    const heightSvg = Math.ceil(props.text.height * props.scaleIndex)
    const textX = Math.ceil(props.text.leftTopPoint.x * props.scaleIndex)
    const textY = Math.ceil(props.text.leftTopPoint.y * props.scaleIndex)
    const textSize = Math.ceil(props.text.size * props.scaleIndex)

    const textStyle = props.text.fontStyle ? `${props.text.fontStyle}` : ''
    const textFont = props.text.font ? `${props.text.font}` : ''
    const textFill = props.text.color ? `${props.text.color}` : ''
     
    const styleSvg = {top: `'${props.text.leftTopPoint.x}px'`, left: `'${props.text.leftTopPoint.y}px'`}

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <text x={textX} y={textY} fontSize={textSize} fill={textFill} fontStyle={`${textStyle} ${textFont}px`}>{props.text.content}</text>
        </svg>
    )
}