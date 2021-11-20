import * as React from 'react'
import {ObjectType} from "../../../../script/slide/slide";
import {Circle} from './Circle'
import {Triangle} from './Triangle'
import {Rect} from './Rect'

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function Figure(props: Props)
{
    if (props.figure.type === 'Rect')
    {
        return (
            <Rect figure={props.figure} scale={props.scale}/>
        )
    }
    else if (props.figure.type === 'Circle')
    {
        return (
            <Circle figure={props.figure} scale={props.scale}/>
        )
    }
    else
    {
        return (
            <Triangle figure={props.figure} scale={props.scale}/>
        )
    }
}