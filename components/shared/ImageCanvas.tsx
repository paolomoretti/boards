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
}
export const ImageCanvas = ({ src }: ImageCanvasProps) => {
  const canvasStyle = {
    backgroundImage: `url(${src})`
  }
  return (
    <Canvas style={canvasStyle} />
  )
}