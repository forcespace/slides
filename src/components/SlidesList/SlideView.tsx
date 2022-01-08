import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setBackgroundColor} from '../../script/slide/actionCreators'
import {Editor, ObjectType, Slide} from '../../script/slide/slide'
import Objects from '../SlideContent/Objects/Objects'

type OwnProps = {
    slide: Slide,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    setBackgroundColor: (slideId: string, color: string) => dispatch(setBackgroundColor(slideId, color))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function SlideView(props: Props) {
    const slideObjects = props.ownProps.slide.objects

    const styleDiv = {
        backgroundColor: props.ownProps.slide.background.color ?? '#fff'
    }

    return (
        <div style={styleDiv}>
            {slideObjects.map((object: ObjectType) =>
                <Objects object={object} scale={props.ownProps.scale} key={Math.random()} />
            )}
        </div>
    )
}

export default connector(SlideView)