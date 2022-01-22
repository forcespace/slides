import {RefObject, useEffect, useRef, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition, setObjectCondition} from '../../script/slide/actionCreators'
import {useDragAndDrop} from '../../script/slide/dragAndDropHook'
import { getRecalculatedObject } from '../../script/slide/objectConditions'
import {useResize} from '../../script/slide/resizeObjectHook'
import {Editor, ObjectType, Position} from '../../script/slide/slide'
import Objects from './Objects/Objects'
import styles from './slideContent.module.css'

type OwnProps = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
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
    const [classNameDnDDiv, setClassNameActive] = useState(`${styles.slide_item}`)
    const [classNameResizeDiv, setClassNameResizePonterSe] = useState(`${styles.slide_item_resize}`)
    const [newObject, setNewObject] = useState(getRecalculatedObject(props.object, props.scale.scaleIndex))

    const styleDiv = {
        top: `${newObject.leftTopPoint.y - 2}px`,
        left: `${newObject.leftTopPoint.x - 2}px`,
        width: newObject.width + 4,
        height: newObject.height + 4
    }

    const ref: RefObject<HTMLDivElement> = useRef(null)
    const refSe: RefObject<HTMLDivElement> = useRef(null)

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
        props.setObjectCondition(width / props.scale.scaleIndex, height / props.scale.scaleIndex)
        props.setEditorActive(props.object.id)
    }

    useDragAndDrop(
        ref,
        newObject,
        setNewObject,
        setAcive,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    useResize(
        refSe,
        newObject,
        setNewObject,
        setAcive,
        setNewCondition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    useEffect(() => {
        if (props.state.active === props.object.id) {
            setClassNameActive(`${styles.slide_item} ${styles.slide_item_active}`)
            setClassNameResizePonterSe(`${styles.slide_item_resize} ${styles.se}`)
        }
    }, [props.state.active])

    return (
        <div
            ref={ref}
            className={classNameDnDDiv}
            style={styleDiv}
            draggable={false}>
            <div ref={refSe} className={classNameResizeDiv}></div>
            <Objects object={newObject} key={props.object.id} scale={props.scale}/>
        </div>
    )
}

export default connector(ObjectContainer)