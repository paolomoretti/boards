import * as React from 'react';
import { Board } from '../../types/boards.types';
import { AutoComplete, Button, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { OptionData, OptionGroupData } from 'rc-select/lib/interface';
import styled from 'styled-components';
import { Colors } from '../../styles/vars';
import { PlusOutlined } from '@ant-design/icons';
import { ModalAddBoard } from '../modals/ModalAddBoard';
import { updateBoards } from '../../data/store/actions';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  padding: 20px;
  margin: 0 -20px;
  background-color: ${Colors.APP_BG};
`;

interface BoardSearchProps {
  boards: Array<Board>;
  onSelect?(value: number, option?: OptionData | OptionGroupData): void
}

export default function BoardsHeader({ boards, onSelect }: BoardSearchProps) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<{ value: string }[]>(boards.map(b => ({ value: b.name })));
  const onSearch = (searchText: string) => {
    // @ts-ignore
    const newOptions: Array<{ value: string; }> = boards
      .map(b => {
        if (searchText && b.name.indexOf(searchText) > -1) {
          return { value: b.name };
        } else {
          return undefined;
        }
      })
      .filter(v => v !== undefined);
    setOptions(newOptions);
  };
  const onOptionSelected = (boardName: string) => {
    if (onSelect) {
      boards.forEach(board => {
        if (board.name.toLowerCase() === boardName.toLowerCase()) {
          onSelect(board.id);
        }
      })
    }
  }
  const onAddBoard = (board: Board) => {
    dispatch(updateBoards([board, ...boards!]));
  }
  const onAdd = () => {
    const modalClose = () => modal.destroy();
    const modal = Modal.info({
      title: 'Create board',
      content: <ModalAddBoard onClose={modalClose} onAdd={onAddBoard} />,
      className: 'modal-no-buttons',
      maskClosable: true
    });
  }

  return (
    <Wrapper>
      <Row justify={'end'}>
        <Col flex={'auto'} />
        <AutoComplete
          options={options}
          style={{ minWidth: '200px' }}
          onSelect={onOptionSelected}
          onSearch={onSearch}
          placeholder="input here"
        />
        <Button style={{marginLeft: 15}} type={'primary'} icon={<PlusOutlined />} onClick={onAdd}>Add</Button>
      </Row>
    </Wrapper>
  )
}