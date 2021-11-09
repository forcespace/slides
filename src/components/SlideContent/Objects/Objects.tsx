import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {Rect} from "./Figures/Rect";
import {Circle} from "./Figures/Circle";
import {Triangle} from "./Figures/Triangle";
import {TextSvg} from "./Texts/Text";
import {Img} from "./Images/Image";

type Props = {
    figure: ObjectType,
    scaleIndex: number
}

export function Objects(props: Props)
{
    if (props.figure.type === 'Rect')
    {
        return (
            <Rect figure={props.figure} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.figure.type === 'Circle')
    {
        return (
            <Circle figure={props.figure} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.figure.type === 'Image')
    {
        return (
            <Img imgObject={props.figure} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.figure.type === 'Text')
    {
        return (
            <TextSvg text={props.figure} scaleIndex={props.scaleIndex}/>
        )
    }
    else
    {
        return (
            <Triangle figure={props.figure} scaleIndex={props.scaleIndex}/>
        )
    }
}