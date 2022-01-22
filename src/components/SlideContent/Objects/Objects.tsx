import {Editor, ObjectType} from '../../../script/slide/slide'
import TextArea from './Texts/Text'
import Img from './Images/Image'
import SvgFigure from './Figures/SvgFigure'
import {connect, ConnectedProps} from 'react-redux'

type OwnProps = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Objects(props: Props) {
    if (props.ownProps.object.type === 'Image') {
        return (
            <Img imgObject={props.ownProps.object}/>
        )
    } else if (props.ownProps.object.type === 'Text') {
        return (
            <TextArea text={props.ownProps.object} scale={props.ownProps.scale}/>
        )
    } else {
        return (
            <SvgFigure figure={props.ownProps.object}/>
        )
    }
}

export default connector(Objects)