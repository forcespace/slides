import React from 'react';
import {Editor} from "../../script/slide/slide";
import styles from './footer.module.css'

export function Footer(props: Editor)
{
    const countSlides = props.presentation.slides.length
    const activeSlide = props.active + 1

    return (
        <footer className={styles.footer}>
            <span className={styles.count}>
               Slide {activeSlide} of {countSlides}
            </span>
        </footer>
    );
}