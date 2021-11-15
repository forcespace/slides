import React from 'react';
import {SlideList} from "../SlidesList";
import {SlideContent} from "../SlideContent";
import {Editor} from "../../script/slide/slide";
import styles from './workspace.module.css'

export function Workspace(props: Editor)
{
    const slidesCount = props.presentation.slides.length;

    return (
        <section className={styles.workspace}>
            <SlideList {...props}/>
            <>
                {slidesCount ? (<SlideContent slide={props.presentation.slides[props.active]} isScale={false}/>) : null}
            </>
        </section>
    );
}