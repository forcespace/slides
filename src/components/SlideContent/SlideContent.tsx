import React, {useRef, useEffect} from 'react';
import {SlideView} from '../SlidesList/SlideView';
import {Slide} from '../../script/slide/slide';
import styles from './slideContent.module.css';
import {Rect} from './Objects/Figures/Rect';

type Props = {
    slide: Slide
}

export function SlideContent(props: Props)
{
    const [width, setWidth] = React.useState(0);
    const slideRef = useRef(null);
    const slideProportion = 1.78;
    const scaleProportion = 1231;

    useEffect(() =>
    {
        const getWidth = (): number =>
        {
            if (slideRef.current)
            {
                const slide = window.getComputedStyle(slideRef.current)
                return slide ? parseFloat(slide.width) : 0
            }

            return 0;
        }

        const handleWindowResize = () =>
        {
            setWidth(getWidth())
        };

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () =>
        {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, []);

    return (
        <div className={styles.slide} style={{height: width / slideProportion}} ref={slideRef}>
            <SlideView slide={props.slide} scale={{isMain: true, scaleIndex: width / scaleProportion}} key={props.slide.id}/>
        </div>
    );
}