import * as React from 'react';
import styled from 'styled-components';

const Canvas = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

interface ImageCanvasProps {
  src: string;
  width?: number;
  height?: number;
}
export const ImageCanvas = ({ src, width, height }: ImageCanvasProps) => {
  const canvasStyle = {
    backgroundImage: `url(${src})`,
    width: width || '100%',
    height: height || '100%'
  }
  return (
    <Canvas style={canvasStyle} />
  )
}