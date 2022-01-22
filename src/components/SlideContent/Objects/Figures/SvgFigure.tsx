import {Editor, ObjectType, Position} from '../../../../script/slide/slide'
import Figure from './Figure'
import styles from '../../slideContent.module.css'
import {ExtendedAction, setEditorActive, setObjectPosition} from '../../../../script/slide/actionCreators'
import {connect, ConnectedProps} from 'react-redux'

type OwnProps = {
    figure: ObjectType,
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.figure.id, position)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function SvgFigure(props: Props) {
    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? props.figure.border.borderSize : 0
    const widthSvg = props.figure.width + 2 * strokeSizeSvg
    const heightSvg = props.figure.height + 2 * strokeSizeSvg

    const styleSvg = {
        width: widthSvg,
        height: heightSvg,
        fill: fillColorSvg,
        stroke: strokeColorSvg,
        strokeWidth: strokeSizeSvg,
        border: ''
    }
    return (
        <svg
            style={styleSvg}
            className={`${styles.slide_item}`}
            xmlns="http://www.w3.org/2000/svg">
            <Figure figure={props.figure}/>
        </svg>
    )
}

export default connector(SvgFigure)