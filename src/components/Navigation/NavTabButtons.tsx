import React from 'react'
import Button from '../Button/Button'
import NavTabs from '../NavTabs/NavTabs'
import Input from '../Input/Input'
import InputFile from '../InputFile/InputFile'
import styles from './nav.module.css'
import stylesButtonTabs from '../Button/button.module.css'

type NavTabButton = {
    classNameParent?: string,
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    titleLabel?: string,
    title?: string,
    mode?: 'button' | 'input' | 'input-file',
    type?: string,
    value?: string
}

type Props = {
    buttons: Array<NavTabButton>,
    hidden: boolean
}

export function NavTabButtons(props: Props) {
    return (
        <NavTabs className={`${styles.tabs} ${props.hidden ? styles.tabs_hidden : ''}`}>
            {
                props.buttons.map(button => {
                    switch (button.mode) {
                        case 'input': {
                            return <Input {...button} key={Math.random()} type={button.type} className={`${stylesButtonTabs.tab} ${button.className}`}
                                value={button.value} />
                        }
                        case 'input-file': {
                            return (
                                <InputFile classNameLabel={`${stylesButtonTabs.tab_wrapper_file} ${button.classNameParent}`}
                                    titleLabel={button.titleLabel} {...button} key={Math.random()}
                                    className={`${stylesButtonTabs.tab} ${button.className}`} />
                            )
                        }
                        default: {
                            return <Button {...button} key={Math.random()} className={`${stylesButtonTabs.tab} ${button.className}`} />
                        }
                    }
                }
                )}
        </NavTabs>
    )
}