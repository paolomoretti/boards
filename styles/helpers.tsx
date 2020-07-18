import styled from 'styled-components';

export const ButtonHolder = styled.div`
  text-align: right;
  
  > * {
    margin-left: 10px;
    
    &:first-of-type {
      margin-left: 0;
    }
  }
`