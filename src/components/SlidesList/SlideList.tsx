import React, {useEffect, useState, useRef} from 'react'
import {SlideView} from './SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import {dispatch} from '../../dispatch'
import {setActive} from '../../script/slide/functions'
import '../../style/block/slide/slide-list.css'
import styles from './slideList.module.css'

export function SlideList(props: Editor) {
    const active = props.active
    const slides: Slide[] = props.presentation.slides

    function isActive(index: number)
    {
        return index === active
    }

    function setActiveSlide(index: number)
    {
        dispatch(setActive, index)
    }

    return (
        <div className={styles.slide_list}>
            {slides.map((slide: Slide, index: number) =>
                <div className={styles.slide_list_item}>
                    <div className={`b-slide-list__content${isActive(index) ? " b-slide-list__content_active" : ""}`} onClick={() => setActiveSlide(index)} draggable={true}>
                        <SlideView slide={slide} scaleIndex={170/1231}/>
                    </div>
                    <span className={styles.slide_count}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    )
}