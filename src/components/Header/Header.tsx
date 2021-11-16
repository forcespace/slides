import React from 'react';
import {Editor} from "../../script/slide/slide";
import {dispatch} from "../../dispatch";
import {setTitle} from "../../script/slide/functions";
import styles from './header.module.css';

export function Header(props: Editor)
{
    const {title} = props.presentation;

    function handleTitleClick()
    {
        const newTitle = window.prompt('Заголовок презентации', title);

        if (newTitle)
        {
            dispatch(setTitle, newTitle)
        }
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title} onClick={handleTitleClick}>
                {title}
            </h1>
        </header>
    );
}