import {Editor, Slide} from '../../script/slide/slide';
import React from 'react';
import SlideContent from '../SlideContent/SlideContent';
import styles from './view.module.css'
import Button from '../Button/Button';
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, viewClose} from '../../script/slide/actionCreators';

type MapState = {
    slides: Array<Slide>
}

type Props = ConnectedProps<typeof connector>

const mapStateToProps = (state: Editor): MapState => ({
    slides: state.presentation.slides
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    viewClose: () => dispatch(viewClose())
})

const connector = connect(mapStateToProps, mapDispatchToProps)

function View(props: Props)
{
    const [active, setActive] = React.useState(0);

    function nextSlide()
    {
        if (active < props.slides.length - 1)
        {
            setActive(active + 1);
        }
    }

    function prevSlide()
    {
        if (active >= 1)
        {
            setActive(active - 1);
        }
    }

    return (
        <div className={styles.view}>
            <SlideContent slide={props.slides[active]}/>
            <Button onClick={prevSlide} className={styles.prev_btn}/>
            <Button onClick={nextSlide} className={styles.next_btn}/>
            <Button onClick={props.viewClose} className={styles.close_btn}/>
        </div>
    );
}

export default connector(View)