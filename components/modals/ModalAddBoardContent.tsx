import * as React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { ButtonHolder } from '../../styles/helpers';
import { Store } from 'rc-field-form/lib/interface';

const { TextArea } = Input;
const { Paragraph } = Typography;

interface ModalAddBoardContentProps {
  boardId: number;
  onClose(): void;
  onAdd(text: string): void;
}

export const ModalAddBoardContent = ({ onClose, onAdd }: ModalAddBoardContentProps) => {
  const onAddContent = (values: Store) => {
    if (values.content && values.content !== '') {
      onAdd(values.content);
    } else {
      message.error('Content is mandatory');
    }
  }
  return (
    <Form onFinish={onAddContent}>
      <Form.Item name="content">
        <TextArea autoSize={{ minRows: 3, maxRows: 8 }} autoFocus={true} />
      </Form.Item>
      <Paragraph style={{textAlign: 'right'}}>
        <a>
          <PaperClipOutlined /> Attach file
        </a>
      </Paragraph>
      <ButtonHolder>
        <Button type={'dashed'} onClick={onClose}>Cancel</Button>
        <Button type={'primary'} htmlType="submit">Add</Button>
      </ButtonHolder>
    </Form>
  )
}