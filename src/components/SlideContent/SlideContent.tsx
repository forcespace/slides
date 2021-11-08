import * as React from 'react';
import {SlideView} from '../SlidesList/SlideView';
import {Slide} from '../../script/slide/slide';
import '../../style/block/slide/slide.css';
import '../../style/main.css';

type Props = {
    slide: Slide,
    isScale: boolean
}

export function SlideContent(props: Props)
{
    const [width, setWidth] = React.useState(0)

    React.useLayoutEffect(() => {
        const getWidth = (): number => {
            const el = document.getElementById('slide')
            if(el)
            {
                const slide = window.getComputedStyle(el)
                return slide ? parseFloat(slide.width) : 0
            }

            return 0;
        }

        const handleWindowResize = () => {
            setWidth(getWidth())
        };

        handleWindowResize()

        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, []);

    return (
        <div className={'b-slide'} style={{height: width / 1.78}} id={"slide"}>
            <SlideView slide={props.slide} scaleIndex={width / 1231}/>
        </div>
    );
}