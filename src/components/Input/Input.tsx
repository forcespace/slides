import React from 'react';

interface InputProps
{
    className: string,
    onClick?: Function,
    title: string,
    type?: string,
    value?: string
}

export default function Input(props: InputProps)
{
    return (
        <input className={props.className} onClick={() => props.onClick == undefined ? null : props.onClick()} title={props.title} type={props.type} value={props.value}/>
    )
}