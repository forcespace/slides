import React from 'react';

interface InputFileProps
{
    className: string,
    onClick?: () => void,
    title: string,
    type?: string,
    value?: string
}

export default function InputFile(props: InputFileProps)
{
    return (
        <label>
            <input className={props.className} onClick={props.onClick} title={props.title} type={'file'}/>
        </label>
    )
}