import {connect, ConnectedProps} from 'react-redux'
import {
    ExtendedAction,
    setEditorActive,
    setObjectPosition
} from '../../../../script/slide/actionCreators'
import {Editor, Image, Position} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type OwnProps = {
    imgObject: Image,
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
    const imgWidth = Math.ceil(props.imgObject.width)
    const imgHeight = Math.ceil(props.imgObject.height)

    const styleImage = {
        top: `${props.imgObject.leftTopPoint.y}px`,
        left: `${props.imgObject.leftTopPoint.x}px`,
        width: imgWidth,
        height: imgHeight
    }

    return (
        <img
            className={`${styles.slide_item_content}`}
            src={imgSrc}
            draggable={false}
            style={styleImage} />
    )
}

export default connector(Img)