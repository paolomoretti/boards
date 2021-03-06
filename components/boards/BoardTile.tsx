import styled from 'styled-components';
import ExtendedCard from '../shared/ExtendedCard';

export const BoardTile = styled(ExtendedCard)`
  min-width: 300px;
  width: 100%;
  border: 1px solid #dedede;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px -2px #ccc;
  
  .ant-card-cover {
    max-height: 300px;
    overflow: hidden;
  }
`;
