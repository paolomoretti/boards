import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { ButtonHolder } from '../../styles/helpers';
import { addBoard } from '../../utils/fetchers/addBoard';
import { Board } from '../../types/boards.types';
import { Store } from 'rc-field-form/lib/interface';

interface ModalAddBoardProps {
  onClose(): void;
  onAdd(board: Board): void;
}

export const ModalAddBoard = ({ onClose, onAdd }: ModalAddBoardProps) => {
  const [loading, setLoading] = useState(false);

  const onAddBoard = (values: Store) => {
    if (values.name && values.name.length > 0) {
      setLoading(true);
      addBoard(values.name)
        .then((board: Board) => {
          message.success(`Board ${board.name} added correctly`);
          onAdd(board);
          onClose();
        })
        .catch(err => {
          message.error(err);
          setLoading(false);
        })
    }
  }

  return (
    <Spin spinning={loading}>
      <Form onFinish={onAddBoard}>
        <Form.Item name="name">
          <Input name={'name'} placeholder={'Board name'} autoFocus={true} />
        </Form.Item>
        <ButtonHolder>
          <Button type={'dashed'} onClick={onClose}>Cancel</Button>
          <Button type={'primary'} htmlType="submit">Add</Button>
        </ButtonHolder>
      </Form>
    </Spin>
  )
}