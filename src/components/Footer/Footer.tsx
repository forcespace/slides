import * as React from 'react';
import '../../style/block/footer/footer.css'

type Props = {
    activeIndex: number,
    slidesCount: number
};

export function Footer(props: Props)
{
    return (
        <footer className={'b-footer'}>
            <span className={'b-footer__text_count'}>
               Slide {props.activeIndex} of {props.slidesCount}
            </span>
        </footer>
    );
}