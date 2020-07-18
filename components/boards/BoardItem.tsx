import styled from 'styled-components';
import { Row } from 'antd';

export const BoardItem = styled(Row)`
  width: 100%;
  border: 1px solid #dedede;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px -2px #ccc;
  background-color: #fff;
  margin-bottom: 1em;
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  > * {
    flex: 1;
    padding: .5em;
    
    &:last-of-type {
    }
  }
`;