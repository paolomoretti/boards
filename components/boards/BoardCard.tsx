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

export default function BoardCard({ board }: { board: Board; }) {
  const dispatch = useDispatch();
  const boards: Array<Board> | undefined = useSelector(getBoards);

  const confirm = () => {
    deleteBoard(board.id);
    dispatch(updateBoards(_.filter(boards, b => b.id !== board.id)));
  }

  return (
    <Card
      bodyStyle={{display: 'none'}}
      title={board.name}
      cover={<BoardCardCover board={board} />}
      extra={[
        <div onClick={stopBubblingUp}>
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