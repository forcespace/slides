import {connect} from 'react-redux'
import {Image} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type Props = {
    imgObject: Image,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function Img(props: Props)
{
    const imgSrc = props.imgObject.src;
    const imgX = Math.ceil(props.imgObject.leftTopPoint.x * props.scale.scaleIndex);
    const imgY = Math.ceil(props.imgObject.leftTopPoint.y * props.scale.scaleIndex);
    const imgWidth = Math.ceil(props.imgObject.width * props.scale.scaleIndex);
    const imgHeight = Math.ceil(props.imgObject.height * props.scale.scaleIndex);

    return (
        <img className={styles.slide_item} src={imgSrc} style={{width: `${imgWidth}px`, height: `${imgHeight}px`, top: `${imgX}px`, left: `${imgY}px`}}/>
    )
}

export default connect()(Img)