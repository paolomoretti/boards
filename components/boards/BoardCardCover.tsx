import { Board } from '../../types/boards.types';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ModalChangeBoardCover } from '../modals/ModalChangeBoardCover';
import { stopBubblingUp } from '../../utils/events/stopBubblingUp';

const Wrapper = styled.div`
  img {
    display: block;
    width: 100%;
  }
  
  &:hover {
    > * {
      opacity: 1;
    }
  }
`;
const EditButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  transition: opacity .3s;
  opacity: .2;
`;
export default function BoardCardCover({ board }: { board: Board; }) {
  const changeCover = (e: SyntheticEvent) => {
    stopBubblingUp(e);

    const modal = Modal.info({
      title: 'Change board cover',
      content: <ModalChangeBoardCover boardId={board.id} onClose={() => modal.destroy()} />,
      className: 'modal-no-buttons',
      maskClosable: true
    });
  }

  return (
    <Wrapper>
      <img src={board.avatar}/>
      <EditButton onClick={changeCover} shape="circle" icon={<EditFilled />} />
    </Wrapper>
  )
}