import {useState, useRef, useEffect} from 'react'
import SlideView from '../SlidesList/SlideView'
import {Editor, Slide} from '../../script/slide/slide'
import styles from './slideContentView.module.css'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive} from '../../script/slide/actionCreators'

type OwnProps = {
    slide: Slide
}

const mapStateToProps = (state: Editor): {state: Editor} => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setEditorActive: (slideId: string) => dispatch(setEditorActive(slideId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector> & OwnProps

function SlideContent(props: Props) {
    const [width, setWidth] = useState(0)
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const slideRef = useRef(null)
    const slideProportion = 1.78
    const fullWidth = 1231
    const colorPriority = 0

    function setActive() {
        props.setEditorActive(props.slide.id)
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

        if (props.slide.background.priority === colorPriority) {
            setColor(props.slide.background.color ?? '')
            setImage('')
        } else {
            setImage(props.slide.background.image ?? '')
            setColor('')
        }

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [width, color, image, props.slide])

    const styleDiv = {
        backgroundColor: color,
        backgroundImage: `url(${image})`,
        height: width / slideProportion
    }

    return (
        <div style={styleDiv} onClick={setActive} className={styles.slide} ref={slideRef}>
            <SlideView slide={props.slide} scale={{isMain: true, scaleIndex: width / fullWidth}} key={props.slide.id}/>
            <span className={styles.overlay}/>
        </div>
    )
}

export default connector(SlideContent)