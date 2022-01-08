import {Editor, ObjectType, Position} from '../../../../script/slide/slide'
import {Ref, useRef, useState} from 'react'
import Figure from './Figure'
import styles from '../../slideContent.module.css'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
import {ExtendedAction, setObjectPosition} from '../../../../script/slide/actionCreators'
import {connect, ConnectedProps} from 'react-redux'

type OwnProps = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

const mapStateToProps = (state: { presentationReducer: Editor }, ownProps: OwnProps) => ({
    state,
    ownProps
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.figure.id, position))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function SvgFigure(props: Props) {
    const fillColorSvg = props.ownProps.figure.background ? props.ownProps.figure.background.color : ''
    const strokeColorSvg = props.ownProps.figure.border ? props.ownProps.figure.border.borderColor : ''
    const strokeSizeSvg = props.ownProps.figure.border ? props.ownProps.figure.border.borderSize * props.ownProps.scale.scaleIndex : 0
    const widthSvg = Math.ceil(props.ownProps.figure.width * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)
    const heightSvg = Math.ceil(props.ownProps.figure.height * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)


    const [position, setPosition] = useState({
        x: Math.ceil(props.ownProps.figure.leftTopPoint.x * props.ownProps.scale.scaleIndex),
        y: Math.ceil(props.ownProps.figure.leftTopPoint.y * props.ownProps.scale.scaleIndex)
    })
    const ref: Ref<SVGSVGElement> = useRef(null)

    const objectParametrs = {
        ...position,
        width: widthSvg,
        height: heightSvg
    }

    console.log('pos: ', position)

    useDragAndDrop(
        ref,
        objectParametrs,
        setPosition,
        (newPosition: any) => {
            const statePosition: Position = {
                x: Math.ceil(newPosition.x / props.ownProps.scale.scaleIndex),
                y: Math.ceil(newPosition.y / props.ownProps.scale.scaleIndex)
            }
            console.log('on drag end pos: ', newPosition)
            props.setObjectPosition(statePosition)
        },
        props.ownProps.scale.isMain,
        props.ownProps.scale.scaleIndex
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
            <Figure figure={props.ownProps.figure} scale={props.ownProps.scale} />
        </svg>
    )
}

export default connector(SvgFigure)