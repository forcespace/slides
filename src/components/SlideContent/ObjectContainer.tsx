import {LegacyRef, useRef, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setBackgroundColor} from '../../script/slide/actionCreators'
import {Editor, ObjectType} from '../../script/slide/slide'
import Objects from './Objects/Objects'
import styles from './slideContent.module.css'

type OwnProps = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setBackgroundColor: (slideId: string, color: string) => dispatch(setBackgroundColor(slideId, color))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

function ObjectContainer(props: Props) {
    const strokeSizeSvg = props.ownProps.object.border ? props.ownProps.object.border.borderSize * props.ownProps.scale.scaleIndex : 0
    const width = Math.round(props.ownProps.object.width * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)
    const height = Math.round(props.ownProps.object.height * props.ownProps.scale.scaleIndex + 2 * strokeSizeSvg)

    const [position, setPosition] = useState({
        x: Math.round(props.ownProps.object.leftTopPoint.x * props.ownProps.scale.scaleIndex) - 1,
        y: Math.round(props.ownProps.object.leftTopPoint.y * props.ownProps.scale.scaleIndex) - 1
    })

    const ref: LegacyRef<HTMLDivElement> = useRef(null)

    // console.log('props.state.active = ', props.state.active)
    // console.log('props.ownProps.object.id = ', props.ownProps.object.id)

    let borderColor = '#ffffff'

    if (props.state.active == props.ownProps.object.id) {
        borderColor = '#00ff00'
    }

    const styleDiv = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        border: `2px solid ${borderColor}`,
        width: width,
        height: height
    }

    return (
        <>
            <div
                ref={ref}
                style={styleDiv}
                className={styles.slide_item}>
            </div>
            <Objects object={props.ownProps.object} scale={props.ownProps.scale} key={props.ownProps.object.id} />
        </>
    )
}

export default connector(ObjectContainer)