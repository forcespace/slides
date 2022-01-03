import React from 'react';

interface InputFileProps
{
    className: string,
    onClick?: Function,
    title: string,
    type?: string
}

export default function InputFile(props: InputFileProps)
{
    return (
        <input className={props.className} onClick={() => props.onClick == undefined ? null : props.onClick()} title={props.title} type={'file'}/>
    )
}