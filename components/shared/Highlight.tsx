import * as React from 'react';
import styled from 'styled-components';

const Highlight = styled.span`
  cronycle_highlight {
    background-color: yellow;
  }
`;

export function HighlightText({ text }: { text: string; }) {
  return (
    <Highlight dangerouslySetInnerHTML={{__html: text }} />
  )
}