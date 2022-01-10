import {Editor, ObjectType, Position} from '../../../../script/slide/slide'
import {Ref, useRef, useState} from 'react'
import Figure from './Figure'
import styles from '../../slideContent.module.css'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
import {ExtendedAction, setEditorActive, setObjectPosition} from '../../../../script/slide/actionCreators'
import {connect, ConnectedProps} from 'react-redux'

type OwnProps = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.figure.id, position)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function SvgFigure(props: Props) {
    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? props.figure.border.borderSize * props.scale.scaleIndex : 0
    const widthSvg = Math.ceil(props.figure.width * props.scale.scaleIndex + 2 * strokeSizeSvg)
    const heightSvg = Math.ceil(props.figure.height * props.scale.scaleIndex + 2 * strokeSizeSvg)


    const [position, setPosition] = useState({
        x: Math.ceil(props.figure.leftTopPoint.x * props.scale.scaleIndex),
        y: Math.ceil(props.figure.leftTopPoint.y * props.scale.scaleIndex)
    })
    const ref: Ref<SVGSVGElement> = useRef(null)

    const objectParametrs = {
        ...position,
        width: widthSvg,
        height: heightSvg
    }

    const setNewPosition = (newPosition: Position) => {
        const statePosition: Position = {
            x: Math.ceil(newPosition.x / props.scale.scaleIndex),
            y: Math.ceil(newPosition.y / props.scale.scaleIndex)
        }
        props.setObjectPosition(statePosition)
        props.setEditorActive(props.figure.id)
    }

    useDragAndDrop(
        ref,
        objectParametrs,
        setPosition,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    const styleSvg = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: widthSvg,
        height: heightSvg,
        fill: fillColorSvg,
        stroke: strokeColorSvg,
        strokeWidth: strokeSizeSvg
    }

    return (
        <svg
            ref={ref}
            style={styleSvg}
            className={styles.slide_item}
            xmlns="http://www.w3.org/2000/svg">
            <Figure figure={props.figure} scale={props.scale} />
        </svg>
    )
}

export default connector(SvgFigure)