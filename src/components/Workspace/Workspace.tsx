import SlideContent from '../SlideContent/SlideContent'
import {Editor} from '../../script/slide/slide'
import styles from './workspace.module.css'
import {connect, ConnectedProps} from 'react-redux'
import SlideList from '../SlidesList/SlideList'

const mapStateToProps = (state: Editor): {state: Editor} => ({
    state: state
})

const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector>

function Workspace(props: Props) {
    const slidesCount = props.state.presentation.slides.length

    return (
        <section className={styles.workspace}>
            <SlideList/>
            <>
                {slidesCount ? (<SlideContent slide={props.state.presentation.slides[props.state.presentation.active]}/>) : null}
            </>
        </section>
    )
}

export default connector(Workspace)