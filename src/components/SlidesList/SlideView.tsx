import {connect, ConnectedProps} from 'react-redux'
import { ExtendedAction, setBackgroundColor } from '../../script/slide/actionCreators'
import {Editor, ObjectType, Slide} from '../../script/slide/slide'
import Objects from '../SlideContent/Objects/Objects'

type OwnProps = {
    slide: Slide,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function mapStateToProps(state: Editor, ownProps: OwnProps): {state: Editor, ownProps: OwnProps} {
    return {
        state,
        ownProps
    } 
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) =>
{
    return {
        setBackgroundColor: (slideId: string) => dispatch(setBackgroundColor(slideId))
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    slide: Slide,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function SlideView(props: Props)
{
    const slideObjects = props.ownProps.slide.objects

    function setBackground() {
        console.log('props.ownProps.slide.id = ', props.ownProps.slide.id)
        props.setBackgroundColor(props.ownProps.slide.id)
    }  

    const styleDiv = {
        backgroundColor: props.ownProps.slide.background.color ?? '#fff' 
    }

    return (
        <div onClick={setBackground} style={styleDiv}>
            {slideObjects.map((object: ObjectType) =>
                <Objects object={object} scale={props.ownProps.scale} key={Math.random()}/>
            )}
        </div>
    );
}

export default connector(SlideView)