import styled from 'styled-components';

export const ButtonHolder = styled.div`
  text-align: right;
  margin-top: 20px;
  
  > * {
    margin-left: 10px;
    
    &:first-of-type {
      margin-left: 0;
    }
  }
`;

export const AlignRight = styled.div`
  text-align: right;
`;

export const AlignCenter = styled.div`
  text-align: center;
`;