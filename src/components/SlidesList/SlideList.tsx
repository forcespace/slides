import SlideView from './SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import {ExtendedAction, setActive} from '../../script/slide/actionCreators'
import styles from './slideList.module.css'
import {connect} from 'react-redux'
import {AnyAction} from 'redux'

const SCALE_INDEX = 0.1381;

function mapStateToProps(state: {presentationReducer: Editor}): {activeSlide: number, slides: Slide[]}
{
    return {
        activeSlide: state.presentationReducer.active,
        slides: state.presentationReducer.presentation.slides
    };
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => AnyAction) =>
{
    return {
        setActive: (index: number) => dispatch(setActive(index))
    };
};

function SlideList(props: {activeSlide: number, slides: Slide[]} & ReturnType<typeof mapDispatchToProps>)
{
    function isActive(index: number)
    {
        return index === props.activeSlide;
    }

    function setActiveSlide(index: number)
    {
        props.setActive(index)
    }

    return (
        <div className={styles.slide_list}>
            {props.slides.map((slide: Slide, index: number) =>
                <div key={slide.id} className={styles.slide}>
                    <div className={`${styles.slide_content} ${isActive(index) ? styles.slide_content_active : ''}`} onClick={() => setActiveSlide(index)} draggable={true}>
                        <SlideView slide={slide} scale={{isMain: false, scaleIndex: SCALE_INDEX}}/>
                    </div>
                    <span className={styles.slide_count}>
                        {index + 1}
                    </span>
                </div>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideList)