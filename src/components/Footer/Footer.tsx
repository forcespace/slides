import {connect, ConnectedProps} from 'react-redux'
import {Editor} from '../../script/slide/slide'
import styles from './footer.module.css'

const mapStateToProps = (state: Editor) => ({
    activeSlide: state.active,
    slides: state.presentation.slides
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

function Footer(props: PropsFromRedux) {
    const countSlides = props.slides.length
    const activeSlideNumber = props.activeSlide + 1

    return (
        <footer className={styles.footer}>
            <span className={styles.count}>
                Slide {activeSlideNumber} of {countSlides}
            </span>
        </footer>
    )
}

export default connector(Footer)