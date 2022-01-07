import {Editor, ObjectType, Position} from '../../../../script/slide/slide'
import {Ref, useRef, useState} from 'react'
import {AnyAction} from 'redux'
import Figure from './Figure'
import styles from '../../slideContent.module.css'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
import {ExtendedAction, setPosition} from '../../../../script/slide/actionCreators'
import {connect} from 'react-redux'

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

function mapStateToProps(state: {presentationReducer: Editor}, ownProps: Props): {state: {presentationReducer: Editor}, ownProps: Props} {
    return {
        state,
        ownProps
    } 
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => AnyAction, ownProps: Props) => {
    return {
        setObjectPosition: (position: Position) => dispatch(setPosition(ownProps.figure.id, position)),
    }
}

function SvgFigure(props: {state: {presentationReducer: Editor}, ownProps: Props} & ReturnType<typeof mapDispatchToProps>) {
    const fillColorSvg = props.ownProps.figure.background ? props.ownProps.figure.background.color : ''
    const strokeColorSvg = props.ownProps.figure.border ? props.ownProps.figure.border.borderColor : ''
    const strokeSizeSvg = props.ownProps.figure.border ? props.ownProps.figure.border.borderSize * props.ownProps.scale.scaleIndex : 0
    const widthSvg = Math.ceil(props.ownProps.figure.width * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)
    const heightSvg = Math.ceil(props.ownProps.figure.height * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)


    const [position, setPosition] = useState({
        x: Math.ceil(props.ownProps.figure.leftTopPoint.x * props.ownProps.scale.scaleIndex),
        y: Math.ceil(props.ownProps.figure.leftTopPoint.y * props.ownProps.scale.scaleIndex)
    })
    const [dragEnd, setDragEnd] = useState(false)
    const ref: Ref<SVGSVGElement> = useRef(null)

    const objectParametrs = {
        ...position,
        width: widthSvg,
        height: heightSvg,
    }
    
    useDragAndDrop(ref, objectParametrs, setPosition, setDragEnd, props.ownProps.scale.isMain, props.ownProps.scale.scaleIndex)
    if(dragEnd) {
        const statePosition: Position = {
            x: Math.ceil(position.x / props.ownProps.scale.scaleIndex),
            y: Math.ceil(position.y / props.ownProps.scale.scaleIndex)
        }
        props.setObjectPosition(statePosition)
    }

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
            <Figure figure={props.ownProps.figure} scale={props.ownProps.scale}/>
        </svg>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SvgFigure)