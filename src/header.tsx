import React from 'react';
import './style/block/header/header.css';
import './style/main.css';

function Header() {
    return (
        <div className={'b-header'}>
            <h1 className={'b-header__title'}>
                Презентация
            </h1>
        </div>
    );
}

export {
    Header
}