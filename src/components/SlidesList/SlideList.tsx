import SlideView from './SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import {ExtendedAction, setActive} from '../../script/slide/actionCreators'
import styles from './slideList.module.css'
import {connect, ConnectedProps} from 'react-redux'

const SCALE_INDEX = 0.1381

const mapStateToProps = (state: Editor): {activeSlide: number, slides: Slide[]} => {
    console.log('state = ', state)
    return {
        activeSlide: state.presentation.active,
        slides: state.presentation.slides
    }
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setActive: (index: number) => dispatch(setActive(index))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

function SlideList(props: Props) {
    function isActive(index: number) {
        return index === props.activeSlide
    }

    function setActiveSlide(index: number) {
        props.setActive(index)
    }

    console.log('slides = ', props.slides)

    return (
        <div className={styles.slide_list}>
            {props.slides.map((slide: Slide, index: number) =>
                <div key={slide.id} className={styles.slide}>
                    <div className={`${styles.slide_content} ${isActive(index) ? styles.slide_content_active : ''}`} onClick={() => setActiveSlide(index)} draggable={true}>
                        <SlideView slide={slide} scale={{isMain: false, scaleIndex: SCALE_INDEX}} />
                    </div>
                    <span className={styles.slide_count}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    )
}

export default connector(SlideList)