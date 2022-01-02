import React from 'react';

interface ButtonProps
{
    className: string,
    onClick?: Function,
    title: string
}

export default function Button(props: ButtonProps)
{
    return (
        <button className={props.className} onClick={() => props.onClick} title={props.title}/>
    )
}