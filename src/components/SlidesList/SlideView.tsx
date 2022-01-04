import {connect} from 'react-redux';
import {ObjectType, Slide} from '../../script/slide/slide';
import {Objects} from '../SlideContent/Objects/Objects';

type Props = {
    slide: Slide,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function SlideView(props: Props)
{
    const slideObjects = props.slide.objects;

    return (
        <>
            {slideObjects.map((object: ObjectType) =>
                <Objects object={object} scale={props.scale} key={Math.random()}/>
            )}
        </>
    );
}