import * as React from "react";
import Title from "antd/lib/typography/Title";

export default function Logo(props: HTMLElement) {
  const miniStyle = {
    color: '#333',
    fontSize: '.55em'
  }
  return (
    <Title {...props} level={4} style={{margin: 0, display: 'inline-block'}}>Cronycle <small style={miniStyle}>mini</small></Title>
  )
}