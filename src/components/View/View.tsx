import {Editor, Slide} from '../../script/slide/slide'
import React from 'react'
import Button from '../Button/Button'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, viewClose} from '../../script/slide/actionCreators'
import SlideContentView from '../SlideContent/SlideContentView'
import styles from './view.module.css'
import stylesButtonTabs from '../Button/button.module.css'

type MapState = {
    slides: Array<Slide>
}

type Props = ConnectedProps<typeof connector>

const mapStateToProps = (state: Editor): {slides: Array<Slide>; state: Editor} => ({
    slides: state.presentation.slides,
    state: state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    viewClose: () => dispatch(viewClose())
})

const connector = connect(mapStateToProps, mapDispatchToProps)

function View(props: Props) {
    const [active, setActive] = React.useState(0)

    function nextSlide() {
        if (active < props.slides.length - 1) {
            setActive(active + 1)
        }
    }

    function prevSlide() {
        if (active >= 1) {
            setActive(active - 1)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <SlideContentView slide={props.slides[active]}/>
                <Button
                    onClick={prevSlide}
                    className={`${stylesButtonTabs.view_btn} ${stylesButtonTabs.view_prev_btn}`}/>
                <Button
                    onClick={nextSlide}
                    className={`${stylesButtonTabs.view_btn} ${stylesButtonTabs.view_next_btn}`}/>
                <Button
                    onClick={props.viewClose}
                    className={`${stylesButtonTabs.view_btn} ${stylesButtonTabs.view_close_btn}`}/>
            </div>
        </div>
    )
}

export default connector(View)