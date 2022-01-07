import {connect} from 'react-redux'
import {Editor, ObjectType, Slide} from '../../script/slide/slide'
import Objects from '../SlideContent/Objects/Objects'

type Props = {
    slide: Slide,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function mapStateToProps(state: {presentationReducer: Editor}, ownProps: Props): {state: {presentationReducer: Editor}, ownProps: Props} {
    return {
        state,
        ownProps
    } 
}

function SlideView(props: {state: {presentationReducer: Editor}, ownProps: Props})
{
    const slideObjects = props.ownProps.slide.objects;

    return (
        <>
            {slideObjects.map((object: ObjectType) =>
                <Objects object={object} scale={props.ownProps.scale} key={Math.random()}/>
            )}
        </>
    );
}

export default connect(mapStateToProps)(SlideView)