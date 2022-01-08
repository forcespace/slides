import React, {useRef, useEffect} from 'react'
import SlideView from '../SlidesList/SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import styles from './slideContent.module.css'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setBackgroundColor} from '../../script/slide/actionCreators'

type OwnProps = {
    slide: Slide
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setBackgroundColor: (slideId: string, color: string) => dispatch(setBackgroundColor(slideId, color))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function SlideContent(props: Props) {
    const [width, setWidth] = React.useState(0)
    const slideRef = useRef(null)
    const slideProportion = 1.78
    const fullWidth = 1231

    function setBackground() {
        props.setBackgroundColor(props.ownProps.slide.id, props.state.color!)
    }

    useEffect(() => {
        const getWidth = (): number => {
            if (slideRef.current) {
                const slide = window.getComputedStyle(slideRef.current)
                return slide ? parseFloat(slide.width) : 0
            }

            return 0
        }

        const handleWindowResize = () => {
            setWidth(getWidth())
        }

        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const styleDiv = {
        backgroundColor: props.ownProps.slide.background.color ?? '#fff',
        height: width / slideProportion
    }

    return (
        <div style={styleDiv} onClick={setBackground} className={styles.slide} ref={slideRef}>
            <SlideView slide={props.ownProps.slide} scale={{isMain: true, scaleIndex: width / fullWidth}} key={props.ownProps.slide.id} />
        </div>
    )
}

export default connector(SlideContent)