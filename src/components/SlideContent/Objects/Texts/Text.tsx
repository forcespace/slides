import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition} from '../../../../script/slide/actionCreators'
import {Editor, Position, Text} from '../../../../script/slide/slide'

type OwnProps = {
    text: Text,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.text.id, position)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function TextArea(props: Props) {
    return (
        <textarea>{props.text.content}</textarea>
    )
}

export default connector(TextArea)