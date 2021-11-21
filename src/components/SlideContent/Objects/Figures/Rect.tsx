import React from 'react';
import {ObjectType} from '../../../../script/slide/slide';

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function Rect(props: Props)
{
    const rectWidth = Math.ceil(props.figure.width * props.scale.scaleIndex);
    const rectHeight = Math.ceil(props.figure.height * props.scale.scaleIndex);
    const rectStroke = props.figure.border ? props.figure.border.borderColor : '';
    const rectStrokeSize = props.figure.border ? Math.ceil(props.figure.border.borderSize * props.scale.scaleIndex) : 0;
    const rectFill = props.figure.background ? props.figure.background.color : '';

    return (
        <rect x={rectStrokeSize} y={rectStrokeSize} width={rectWidth} height={rectHeight} stroke={rectStroke} fill={rectFill}/>
    )
}