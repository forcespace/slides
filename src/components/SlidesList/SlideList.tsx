import {SlideView} from './SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import {setActive, ExtendedAction} from '../../script/slide/actionCreators'
import styles from './slideList.module.css'
import {connect} from 'react-redux'

const SCALE_INDEX = 0.1381

function mapStateToProps(state: {presentationReducer: Editor}): {activeSlide: number, slides: Slide[]}
{
    return {activeSlide: state.presentationReducer.active, slides: state.presentationReducer.presentation.slides}
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => any) =>
{
    return {
        setActive: (index: number) => dispatch(setActive(index))
    }
}

function SlideList(props: {activeSlide: number, slides: Slide[], setActive: Function})
{
    function isActive(index: number)
    {
        return index === props.activeSlide
    }
    

    function setActiveSlide(index: number)
    {
        props.setActive(index)
    }

    return (
        <div className={styles.slide_list}>
            {props.slides.map((slide: Slide, index: number) =>
                <div key={Math.random()} className={styles.slide_list_item}>
                    <div className={`${styles.slide_content} ${isActive(index) ? styles.slide_content_active : ''}`}
                         onClick={() => setActiveSlide(index)} draggable={true}>
                        <SlideView slide={slide} scale={{isMain: false, scaleIndex: SCALE_INDEX}}/>
                    </div>
                    <span className={styles.slide_count}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideList)