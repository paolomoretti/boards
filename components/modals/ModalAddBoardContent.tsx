import * as React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { PaperClipOutlined, TagsOutlined } from '@ant-design/icons';
import { ButtonHolder } from '../../styles/helpers';
import { Store } from 'rc-field-form/lib/interface';
import styled from 'styled-components';

const { TextArea } = Input;
const { Paragraph } = Typography;
const ExtrasParagraph = styled(Paragraph)`
  padding: 3px 0 0;
  a {
    margin-left: .7em;
  }
`

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
      <Form.Item name="content" style={{margin: 0}}>
        <TextArea autoSize={{ minRows: 3, maxRows: 8 }} autoFocus={true} />
      </Form.Item>
      <ExtrasParagraph style={{textAlign: 'right', marginTop: 0}}>
        <a>
          <TagsOutlined /> Add tags
        </a>
        <a>
          <PaperClipOutlined /> Attach file
        </a>
      </ExtrasParagraph>
      <ButtonHolder>
        <Button type={'dashed'} onClick={onClose}>Cancel</Button>
        <Button type={'primary'} htmlType="submit">Add</Button>
      </ButtonHolder>
    </Form>
  )
}