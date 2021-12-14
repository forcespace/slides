import React from 'react';

interface InputFileProps
{
    className: string,
    onClick?: () => void,
    title: string,
    type?: string
}

export default function InputFile(props: InputFileProps)
{
    return (
        <input className={props.className} onClick={props.onClick} title={props.title} type={'file'}/>
    )
}