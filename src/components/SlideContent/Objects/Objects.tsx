import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {Rect} from "./Figures/Rect";
import {Circle} from "./Figures/Circle";
import {Triangle} from "./Figures/Triangle";
import {TextSvg} from "./Texts/Text";
import {Img} from "./Images/Image";

type Props = {
    object: ObjectType,
    scaleIndex: number
}

export function Objects(props: Props)
{
    if (props.object.type === 'Rect')
    {
        return (
            <Rect figure={props.object} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.object.type === 'Circle')
    {
        return (
            <Circle figure={props.object} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.object.type === 'Image')
    {
        return (
            <Img imgObject={props.object} scaleIndex={props.scaleIndex}/>
        )
    }
    else if (props.object.type === 'Text')
    {
        return (
            <TextSvg text={props.object} scaleIndex={props.scaleIndex}/>
        )
    }
    else
    {
        return (
            <Triangle figure={props.object} scaleIndex={props.scaleIndex}/>
        )
    }
}