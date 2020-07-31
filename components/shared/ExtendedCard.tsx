import { Card } from 'antd';
import { ReactNode } from 'react';
import { CardProps } from 'antd/lib/card';

export default function ExtendedCard(props: CardProps & { footer?: ReactNode}) {
  return (
    <Card {...props}>
      {props.children}
      {props.footer}
    </Card>
  )
}