import React, {useRef, useEffect} from 'react'
import SlideView from '../SlidesList/SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import styles from './slideContent.module.css'
import {connect} from 'react-redux'

type Props = {
    slide: Slide
}

function mapStateToProps(state: {presentationReducer: Editor}, ownProps: Props): {state: {presentationReducer: Editor}, ownProps: Props} {
    return {
        state,
        ownProps
    } 
}

function SlideContent(props: {state: {presentationReducer: Editor}, ownProps: Props})
{
    const [width, setWidth] = React.useState(0);
    const slideRef = useRef(null)
    const slideProportion = 1.78
    const fullWidth = 1231

    useEffect(() =>
    {
        const getWidth = (): number =>
        {
            if (slideRef.current)
            {
                const slide = window.getComputedStyle(slideRef.current);
                return slide ? parseFloat(slide.width) : 0;
            }

            return 0;
        };

        const handleWindowResize = () =>
        {
            setWidth(getWidth());
        };

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () =>
        {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div className={styles.slide} style={{height: width / slideProportion}} ref={slideRef}>
            <SlideView slide={props.ownProps.slide} scale={{isMain: true, scaleIndex: width / fullWidth}} key={props.ownProps.slide.id}/>
        </div>
    );
}

export default connect(mapStateToProps)(SlideContent)