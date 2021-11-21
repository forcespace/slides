import React from 'react';
import {Text} from '../../../../script/slide/slide';

type Props = {
    text: Text,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function TextSvg(props: Props)
{
    return (
        <span>{props.text.content}</span>
    )
}