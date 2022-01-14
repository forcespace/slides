import {useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {Editor, ObjectType} from '../../script/slide/slide'
import Objects from './Objects/Objects'

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

const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector> & OwnProps

function ObjectContainer(props: Props) {
    const strokeSizeSvg = props.object.border ? props.object.border.borderSize * props.scale.scaleIndex : 0
    const width = Math.round(props.object.width * props.scale.scaleIndex + 2 * strokeSizeSvg)
    const height = Math.round(props.object.height * props.scale.scaleIndex + 2 * strokeSizeSvg)

    const [position, setPosition] = useState({
        x: Math.round(props.object.leftTopPoint.x * props.scale.scaleIndex) - 1,
        y: Math.round(props.object.leftTopPoint.y * props.scale.scaleIndex) - 1
    })

    const styleDiv = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: width,
        height: height
    }

    return (
        <>
            <div style={styleDiv}/>
            <Objects object={props.object} scale={props.scale} key={props.object.id} />
        </>
    )
}

export default connector(ObjectContainer)