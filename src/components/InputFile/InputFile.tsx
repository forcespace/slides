import React from 'react';

interface InputFileProps
{
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    title: string,
    type?: string
}

export default function InputFile(props: InputFileProps)
{
    return (
        <input className={props.className} onClick={props.onClick} onChange={props.onChange} title={props.title} type={'file'}/>
    )
}