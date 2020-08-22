import { Button, Card, Popconfirm } from 'antd';
import { Board } from '../../types/boards.types';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../../data/store/selectors';
import { updateBoards } from '../../data/store/actions';
import { deleteBoard } from '../../utils/fetchers/deleteBoard';
import * as _ from 'lodash';
import { stopBubblingUp } from '../../utils/events/stopBubblingUp';
import BoardCardCover from './BoardCardCover';
import styled from 'styled-components';
import { Shadows } from '../../styles/vars';

const Container = styled(Card)`
  transition: transform .2s, box-shadow .2s; 
  border-radius: 5px;
  
  .ant-card-cover {
    margin: 0;
  }
  
  &:hover {
    cursor: pointer;
    transform: translate(0, -4px);
    box-shadow: ${Shadows.POP_OUT};
  }
`

export default function BoardCard({ board }: { board: Board; }) {
  const dispatch = useDispatch();
  const boards: Array<Board> | undefined = useSelector(getBoards);

  const confirm = () => {
    deleteBoard(board.id);
    dispatch(updateBoards(_.filter(boards, b => b.id !== board.id)));
  }

  return (
    <Container
      bodyStyle={{display: 'none'}}
      title={board.name}
      cover={<BoardCardCover board={board} />}
      extra={[
        <div onClick={stopBubblingUp} key={'delete-action'}>
          <Popconfirm
            title="Are you sure you want to delete this board?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ]}
    />
  )
}
