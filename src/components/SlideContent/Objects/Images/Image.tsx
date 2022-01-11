import {
    RefObject,
    useRef,
    useState
} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {
    ExtendedAction,
    setEditorActive,
    setObjectPosition
} from '../../../../script/slide/actionCreators'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
import {Editor, Image, Position} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type OwnProps = {
    imgObject: Image,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.imgObject.id, position)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Img(props: Props) {
    const imgSrc = props.imgObject.src
    const imgWidth = Math.ceil(props.imgObject.width * props.scale.scaleIndex)
    const imgHeight = Math.ceil(props.imgObject.height * props.scale.scaleIndex)

    const [position, setPosition] = useState({
        x: Math.ceil(props.imgObject.leftTopPoint.x * props.scale.scaleIndex),
        y: Math.ceil(props.imgObject.leftTopPoint.y * props.scale.scaleIndex)
    })
    const ref: RefObject<HTMLImageElement> = useRef(null)

    const objectParametrs = {
        ...position,
        width: imgWidth,
        height: imgHeight
    }

    const setNewPosition = (newPosition: Position) => {
        const statePosition: Position = {
            x: Math.ceil(newPosition.x / props.scale.scaleIndex),
            y: Math.ceil(newPosition.y / props.scale.scaleIndex)
        }
        props.setObjectPosition(statePosition)
        props.setEditorActive(props.imgObject.id)
    }

    useDragAndDrop(
        ref,
        objectParametrs,
        setPosition,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    const styleImage = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: imgWidth,
        height: imgHeight
    }

    return (
        <img
            ref={ref}
            className={styles.slide_item}
            src={imgSrc}
            style={styleImage} />
    )
}

export default connector(Img)