import React from 'react';
import {SlideView} from '../SlidesList/SlideView';
import {Slide} from '../../script/slide/slide';
import styles from './slideContent.module.css';

type Props = {
    slide: Slide
}

export function SlideContent(props: Props)
{
    const [width, setWidth] = React.useState(0)

    React.useEffect(() =>
    {
        const getWidth = (): number =>
        {
            const el = document.getElementById('slide')
            if (el)
            {
                const slide = window.getComputedStyle(el)
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
        <div className={styles.slide} style={{height: width / 1.78}} id={'slide'}>
            <SlideView slide={props.slide} scale={{isMain: true, scaleIndex: width / 1231}}/>
        </div>
    );
}