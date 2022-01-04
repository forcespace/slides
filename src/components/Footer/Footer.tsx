import { connect } from 'react-redux'
import {Editor, Slide} from '../../script/slide/slide'
import styles from './footer.module.css'

function mapStateToProps(state: {presentationReducer: Editor}): {activeSlide: number, slides: Slide[]}  {
    return {
        activeSlide: state.presentationReducer.active,
        slides: state.presentationReducer.presentation.slides
    } 
}

function Footer(props: {activeSlide: number, slides: Slide[]})
{
    const countSlides = props.slides.length
    const activeSlideNumber = props.activeSlide + 1

    return (
        <footer className={styles.footer}>
            <span className={styles.count}>
               Slide {activeSlideNumber} of {countSlides}
            </span>
        </footer>
    );
}

export default connect(mapStateToProps)(Footer)