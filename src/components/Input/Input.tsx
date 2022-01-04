import React from 'react';

interface InputProps
{
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    title?: string,
    type?: string,
    value?: string
}

export default function Input(props: InputProps)
{
    return (
        <input className={props.className} onClick={props.onClick} title={props.title} type={props.type} value={props.value}/>
    )
}