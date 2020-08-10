import * as React from "react";
import { Typography } from 'antd';

const { Title } = Typography;
export default function Logo(props?: HTMLElement) {
  const miniStyle = {
    color: '#333',
    fontSize: '.55em'
  }
  return (
    <Title {...props} level={4} style={{margin: 0, display: 'inline-block'}}>Cr<span className={'hide-mobile'}>onycle</span> <small style={miniStyle}>mini</small></Title>
  )
}