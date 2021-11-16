import * as React from 'react';
import ReactDOM from "react-dom";
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    scaleIndex: number
}

export function Rect(props: Props)
{
    const widthSvg = Math.ceil(props.figure.width * props.scaleIndex)
    const heightSvg = Math.ceil(props.figure.height * props.scaleIndex)
    const xSvg = Math.ceil(props.figure.leftTopPoint.x * props.scaleIndex)
    const ySvg = Math.ceil(props.figure.leftTopPoint.y * props.scaleIndex)

    const rectStroke = props.figure.border ? props.figure.border.borderColor : ''
    const rectFill = props.figure.background ? props.figure.background.color : ''

    const [position, setPosition] = React.useState({
        x: xSvg,
        y: ySvg,
        offset: {x: 0, y: 0}
      });
    
      const handleMouseMove = React.useRef((e: any) => {
        setPosition(position => {
          const xDiff = position.offset.x - e.pageX;
          const yDiff = position.offset.y - e.pageY;
          console.log('e.pageX = ', e.pageX)
          console.log('e.pageY = ', e.pageY)
          return {
            x: position.x - xDiff,
            y: position.y - yDiff,
            offset: {
              x: e.pageX,
              y: e.pageY,
            },
          };
        });
      });
    
      const handleMouseDown = (e: any) => {
        // Save the values of pageX and pageY and use it within setPosition.
        const pageX = e.pageX; 
        const pageY = e.pageY;
        setPosition(position => Object.assign({}, position, {
          offset: {
            x: pageX,
            y: pageY,
          },
        }));
        document.addEventListener('mousemove', handleMouseMove.current);
      };
    
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove.current);
        setPosition(position =>
          Object.assign({}, position, {
            offset: {},
          })
        );
      };

    const styleSvg = {
        top: `${position.x}px`,
        left: `${position.y}px`,
        width: widthSvg,
        height: heightSvg
    }

    console.log('position.x = ', position.x)
    console.log('position.y = ', position.y)
    return (
        <svg style={styleSvg} className={'b-slide__content-item'} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={0} y={0} width={widthSvg} height={heightSvg} stroke={rectStroke} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp} fill={rectFill}
            />
        </svg>
    )
}