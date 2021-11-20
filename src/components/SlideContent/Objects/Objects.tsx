import * as React from 'react';
import {ObjectType} from '../../../script/slide/slide'
import {TextSvg} from "./Texts/Text";
import {Img} from "./Images/Image";
import {SvgFigure} from './Figures/SvgFigure'

type Props = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function Objects(props: Props)
{
    if (props.object.type === 'Image')
    {
        return (
            <Img imgObject={props.object} scale={props.scale}/>
        )
    }
    else if (props.object.type === 'Text')
    {
        return (
            <TextSvg text={props.object} scale={props.scale}/>
        )
    }
    else
    {
        return (
            <SvgFigure figure={props.object} scale={props.scale}/>
        )
    }
}