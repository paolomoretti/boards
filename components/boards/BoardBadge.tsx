import { Board } from '../../types/boards.types';
import styled from 'styled-components';
import { ImageCanvas } from '../shared/ImageCanvas';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  > * {
    flex: 10;
    
    &:first-child:not(:last-child) {
      flex: 1;
    }
  }
  h4 {
    margin: 0;
    padding: 0 10px;
  }
`;

export default function BoardBadge({ board }: { board: Board; }) {
  return (
    <Container>
      {board.avatar && <ImageCanvas width={30} height={30} src={board.avatar as string} />}
      <h4>{board.name}</h4>
    </Container>
  )
}
