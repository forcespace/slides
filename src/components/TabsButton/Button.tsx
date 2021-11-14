import * as React from 'react';

interface ButtonProps
{
    className: string,
    callback: () => void,
    title: string
}


export default function Button(props: ButtonProps)
{
    return (
        <button className={props.className} onClick={props.callback} title={props.title}/>
    )
}