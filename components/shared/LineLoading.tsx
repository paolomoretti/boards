import * as React from "react";
import styled from "styled-components";
import {ReactNode} from "react";
import {Colors} from "../../styles/vars";

const Line = styled.div`
  @keyframes loader-animation {
    0% {
      width: 0;
      background-color: ${Colors.PRIMARY};
    }
    49% {
      width: 100%;
      left: 0;
      background-color: ${Colors.SUCCESS};
    }
    100% {
      left: 100%;
      width: 0;
      background-color: ${Colors.PRIMARY};
    }
  }
  position: relative;
  
  > .bar {
    position: absolute;
    top: 0;
    animation-name: loader-animation;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    background: ${Colors.PRIMARY};
    display: none;
    height: 2px;
    z-index: 10;
  }
  
  &.loading > .bar {
    display: block;
  }
`;

export function LineLoading({ loading , children }: { loading?: boolean; children: ReactNode; }) {
  return (
    <Line className={loading === true ? 'loading line-loader-animated' : 'idle'}>
      <div className="bar" />
      {children}
    </Line>
  )
}
