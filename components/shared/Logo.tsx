import * as React from "react";
import Title from "antd/lib/typography/Title";

export default function Logo() {
  const miniStyle = {
    color: '#333',
    fontSize: '.55em'
  }
  return (
    <Title level={4} style={{margin: 0, display: 'inline-block'}}>Cronycle <small style={miniStyle}>mini</small></Title>
  )
}