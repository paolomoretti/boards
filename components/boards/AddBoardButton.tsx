import * as React from 'react';
import {Board} from '../../types/boards.types';
import {Button, Modal} from 'antd';
import styled from 'styled-components';
import {PlusOutlined} from '@ant-design/icons';
import {ModalAddBoard} from '../modals/ModalAddBoard';
import {updateBoards} from '../../data/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {getBoards} from "../../data/store/selectors";
import { Styles } from '../../styles/vars';

const Wrapper = styled.div`
  button {
    transform: scale(1.3);
  }
`;

export default function AddBoardButton() {
  const dispatch = useDispatch();
  const boards: Array<Board> | undefined = useSelector(getBoards);
  const onAddBoard = (board: Board) => {
    dispatch(updateBoards([board, ...boards!]));
  };

  const onAdd = () => {
    const modalClose = () => modal.destroy();
    const modal = Modal.info({
      title: 'Create board',
      content: <ModalAddBoard onClose={modalClose} onAdd={onAddBoard} />,
      className: 'modal-no-buttons',
      maskClosable: true
    });
  };

  return (
    <Wrapper style={Styles.ContextualAddButton}>
      <Button
        type={'primary'}
        shape={'circle'}
        icon={<PlusOutlined />}
        onClick={onAdd}
        size={'large'}
      />
    </Wrapper>
  )
}
