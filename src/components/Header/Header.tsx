import React from 'react';
import '../../style/block/header/header.css';
import '../../style/main.css';

type HeaderProps = {
    title: string;
};

export function Header(props: HeaderProps) {
    return (
        <header className={'b-header'}>
            <h1 className={'b-header__title'}>
                {props.title}
            </h1>
        </header>
    );
}