import * as React from 'react';
import '../../style/block/footer/footer.css'
import {Editor} from "../../script/slide/slide";

export function Footer(props: Editor) {
    const countSlides = props.presentation.slides.length
    const activeSlide = props.active + 1

    return (
        <footer className={'b-footer'}>
            <span className={'b-footer__text_count'}>
               Slide {activeSlide} of {countSlides}
            </span>
        </footer>
    );
}