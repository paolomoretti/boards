import { Board } from '../../types/boards.types';
import styled from 'styled-components';
import { Button, message, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import { ModalChangeBoardCover } from '../modals/ModalChangeBoardCover';
import { stopBubblingUp } from '../../utils/events/stopBubblingUp';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../data/store/actions';
import { ImageCanvas } from '../shared/ImageCanvas';

const Wrapper = styled.div`
  margin-bottom: -1px;
  
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
  const dispatch = useDispatch();
  const [avatarSnapshot, setSnapshot] = useState(board.avatar);

  const changeCover = (e: SyntheticEvent) => {
    stopBubblingUp(e);

    const onCloseModal = (coverUrl: string, $promise: Promise<{ status?: 'ok', errors?: Array<string>; }>) => {
      if (!coverUrl) {
        modal.destroy();
      }
      dispatch(updateBoard({
        ...board,
        avatar: coverUrl
      }));

      modal.update({ visible: false });
      $promise.then(res => {
        if (res && res.errors) {
          message.error(res.errors.join(', '));
          dispatch(updateBoard({
            ...board,
            avatar: avatarSnapshot
          }));
        } else {
          setSnapshot(board.avatar);
          modal.destroy();
        }
      });
    };

    const modal = Modal.info({
      title: 'Change board cover',
      content: <ModalChangeBoardCover boardId={board.id} onClose={onCloseModal} />,
      className: 'modal-no-buttons',
      maskClosable: true
    });
  }

  return (
    <Wrapper>
      <ImageCanvas src={board.avatar!} height={230} />
      <EditButton onClick={changeCover} shape="circle" icon={<EditFilled />} />
    </Wrapper>
  )
}