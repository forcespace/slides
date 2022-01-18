import {RefObject, useEffect, useRef, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition, setObjectCondition} from '../../script/slide/actionCreators'
import {useDragAndDrop} from '../../script/slide/dragAndDropHook'
import {useResize} from '../../script/slide/resizeObjectHook'
import {Editor, ObjectType, Position} from '../../script/slide/slide'
import Objects from './Objects/Objects'
import styles from './slideContent.module.css'

type OwnProps = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

const mapStateToProps = (state: Editor): {state: Editor} => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.object.id, position)),
    setObjectCondition: (width: number, height: number) => dispatch(setObjectCondition(ownProps.object.id, width, height)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector> & OwnProps

function ObjectContainer(props: Props) {
    const strokeSizeSvg = props.object.border ? props.object.border.borderSize * props.scale.scaleIndex : 0

    const [position, setPosition] = useState({
        x: props.object.leftTopPoint.x * props.scale.scaleIndex,
        y: props.object.leftTopPoint.y * props.scale.scaleIndex
    })

    const [width, setWidth] = useState(props.object.width * props.scale.scaleIndex + 2 * strokeSizeSvg)
    const [height, setHeight] = useState(props.object.height * props.scale.scaleIndex + 2 * strokeSizeSvg)
    const [newObject, setNewObject] = useState(props.object)

    useEffect(() => {
        const newPropsObject = {
            ...props.object,
            width: width,
            height: height
        }
        setNewObject(newPropsObject)
    }, [width, height])

    const ref: RefObject<HTMLDivElement> = useRef(null)
    const refSe: RefObject<HTMLDivElement> = useRef(null)

    const objectParameters = {
        ...position,
        width: width,
        height: height
    }

    const setAcive = () => {
        props.setEditorActive(props.object.id)
    }

    const setNewPosition = (newPosition: Position) => {
        const statePosition: Position = {
            x: newPosition.x / props.scale.scaleIndex,
            y: newPosition.y / props.scale.scaleIndex
        }
        props.setObjectPosition(statePosition)
    }

    const setNewCondition = (width: number, height: number) => {
        props.setObjectCondition(width, height)
        props.setEditorActive(props.object.id)
    }

    useDragAndDrop(
        ref,
        objectParameters,
        setPosition,
        setAcive,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    useResize(
        refSe,
        objectParameters,
        setWidth,
        setHeight,
        setAcive,
        setNewCondition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    let className = ''
    let classNameResizePonterSe = ''

    if (props.state.active === props.object.id) {
        className = `${styles.slide_item_active}`
        classNameResizePonterSe = `${styles.se}`
    }

    const styleDiv = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: width,
        height: height
    }

    return (
        <div
            ref={ref}
            className={`${styles.slide_item} ${className}`}
            style={styleDiv}
            draggable={false}>
            <div ref={refSe} className={`${styles.slide_item_resize} ${classNameResizePonterSe}`}></div>
            <Objects object={newObject} key={props.object.id} />
        </div>
    )
}

export default connector(ObjectContainer)