import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {Rect} from "./Figures/Rect";
import {Circle} from "./Figures/Circle";
import {Triangle} from "./Figures/Triangle";

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Objects(props: Props)
{
    if (props.figure.type === 'Rect')
    {
        return (
            <Rect figure={props.figure} isScale={props.isScale}/>
        )
    }
    else if (props.figure.type === 'Circle')
    {
        return (
            <Circle figure={props.figure} isScale={props.isScale}/>
        )
    }
    else
    {
        return (
            <Triangle figure={props.figure} isScale={props.isScale}/>
        )
    }
}