import SlideView from './SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import {ExtendedAction, setActive} from '../../script/slide/actionCreators'
import styles from './slideList.module.css'
import {connect, ConnectedProps} from 'react-redux'

const SCALE_INDEX = 0.1381

const mapStateToProps = (state: Editor): {state: Editor} => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setActive: (index: number) => dispatch(setActive(index))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

function SlideList(props: Props) {
    const width = 250
    const slideProportion = 1.78

    function isActive(index: number) {
        return index === props.state.presentation.active
    }

    function setActiveSlide(index: number) {
        props.setActive(index)
    }

    return (
        <div className={styles.slide_list}>
            {props.state.presentation.slides.map((slide: Slide, index: number) =>
                <div key={slide.id} className={styles.slide}>
                    <div style={{backgroundColor: slide.background.color, height: width / slideProportion}} className={`${styles.slide_content} ${isActive(index) ? styles.slide_content_active : ''}`} onClick={() => setActiveSlide(index)} draggable={true}>
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