import * as React from "react";
import { Typography } from 'antd';
import styled from "styled-components";

const { Title } = Typography;
const LogoExtended = styled.span`
  color: #fff;
`;

export default function Logo(props?: HTMLElement) {
  const miniStyle = {
    color: '#333',
    fontSize: '.55em'
  };

  return (
    <Title {...props} level={4} style={{margin: 0, display: 'inline-block'}}>Cr<LogoExtended className={'hide-mobile'}>onycle</LogoExtended> <small style={miniStyle}>mini</small></Title>
  )
}
