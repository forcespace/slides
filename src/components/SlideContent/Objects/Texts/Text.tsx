import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition} from '../../../../script/slide/actionCreators'
import {Editor, Position, Text} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css';

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

    let className = '';

    if (props.state.active === props.text.id)
    {
        className = `${styles.slide_item_active}`;
    }

    return (
        <textarea className={`${className}`}>{props.text.content}</textarea>
    )
}

export default connector(TextArea)