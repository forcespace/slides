import * as React from 'react';
import '../../style/block/footer/footer.css'

type Props = {};

export function Footer(props: Props) {
    return (
        <footer className={'b-footer'}>
            <span className={'b-footer__text_count'}>
               1 of 10
            </span>
        </footer>
    );
}