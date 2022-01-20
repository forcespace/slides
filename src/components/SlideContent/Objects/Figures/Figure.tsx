import {Editor, ObjectType} from '../../../../script/slide/slide'
import Circle from './Circle'
import Triangle from './Triangle'
import Rect from './Rect'
import {connect, ConnectedProps} from 'react-redux'

type OwnProps = {
    figure: ObjectType,
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Figure(props: Props) {
    if (props.ownProps.figure.type === 'Rect') {
        return (
            <Rect figure={props.ownProps.figure}/>
        )
    } else if (props.ownProps.figure.type === 'Circle') {
        return (
            <Circle figure={props.ownProps.figure}/>
        )
    } else {
        return (
            <Triangle figure={props.ownProps.figure}/>
        )
    }
}

export default connector(Figure)