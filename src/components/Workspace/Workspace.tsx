import SlideContent from '../SlideContent/SlideContent'
import {Editor, Slide} from '../../script/slide/slide'
import styles from './workspace.module.css'
import {connect} from 'react-redux'
import SlideList from '../SlidesList/SlideList'

function mapStateToProps(state: {presentationReducer: Editor}): {activeSlide: number, slides: Slide[]}  {
    return {
        activeSlide: state.presentationReducer.active,
        slides: state.presentationReducer.presentation.slides
    } 
}

function Workspace(props: {activeSlide: number, slides: Slide[]})
{
    const slidesCount = props.slides.length

    return (
        <section className={styles.workspace}>
            <SlideList/>
            <>
                {slidesCount ? (<SlideContent slide={props.slides[props.activeSlide]}/>) : null}
            </>
        </section>
    )
}

export default connect(mapStateToProps)(Workspace)