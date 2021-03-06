import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/vars';
import { Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import {ReactNode} from "react";

const { Paragraph } = Typography;
const QuoteStyle = styled(Paragraph)`
  word-break: break-word;
  white-space: pre-line;
  background-color: ${Colors.NOTE};
  padding: .5em;
  font-style: italic;
  font-size: .9em;
`;

interface QuoteProps extends ParagraphProps {
  text: string | ReactNode;
}
export const Quote = (props: QuoteProps) => {
  const { text } = props;
  return (
    <QuoteStyle {...props}>{text}</QuoteStyle>
  );
}
