import React from 'react'
import stylesButtonTabs from '../Button/button.module.css'

interface InputFileProps {
    classNameLabel: string,
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    titleLabel?: string,
    title?: string,
    type?: string
}

export default function InputFile(props: InputFileProps) {
    return (
        <label className={`${props.classNameLabel} ${stylesButtonTabs.tab_wrapper_file}`} title={props.titleLabel}>
            <input className={props.className} onClick={props.onClick} onChange={props.onChange} title={props.title} type={'file'} />
        </label>
    )
}