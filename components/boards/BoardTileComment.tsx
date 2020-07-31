import { Board, BoardTile, TileComment } from '../../types/boards.types';
import styled from 'styled-components';
import { ReactNode, useState } from 'react';
import { Avatar, Comment, message, Popconfirm, Spin, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentBoard, getUser } from '../../data/store/selectors';
import moment from 'moment';
import { User } from '../../types/app.types';
import { deleteBoardTileComment } from '../../utils/fetchers/deleteBoardTileComment';
import { BoardTileCommentAdd } from './BoardTileCommentAdd';

const { Link } = Typography;
const ActionLink = styled(Link)`
  margin-right: .5em;
`;

interface BoardTileCommentProps {
  tile: BoardTile;
  comment: TileComment;
  onDeleted?(id: number): void;
  onReplied?(reply: TileComment): void;
}
export const BoardTileComment = ({ comment, tile, onDeleted, onReplied }: BoardTileCommentProps) => {
  const [loading, setLoading] = useState(false);
  const [replying, setReplying] = useState(false);
  const board: Board = useSelector(getCurrentBoard)!;
  const user: User = useSelector(getUser)!;

  const onError = (err: any) => {
    message.error(err.toString());
    setLoading(false);
  }

  const onDelete = () => {
    setLoading(true);
    deleteBoardTileComment(comment.comment_id, comment.comment_thread_id, board.id, tile.id)
      .then(() => {
        setLoading(false);
        if (onDeleted) {
          onDeleted(comment.comment_id);
        }
      })
      .catch(onError)
  }

  const onReplyDeleted = (replyId: number) => {
    if (onDeleted) {
      onDeleted(replyId);
    }
  }

  const onReply = () => {
    setReplying(true);
  }

  const onReplyCreated = (reply: TileComment) => {
    setReplying(false);
    if (onReplied) {
      onReplied(reply);
    }
  }

  const getActions = (comment: TileComment): Array<ReactNode> => {
    const actions: Array<ReactNode> = [];

    if(comment.replies) {
      actions.push(<ActionLink onClick={onReply}>Reply</ActionLink>)
    }
    if (comment.user.id === user.id) {
      actions.push(
        <Popconfirm title="Are you sure you want to delete this comment?" placement={'top'} onConfirm={onDelete}>
          <Link type="danger">Delete</Link>
        </Popconfirm>
      )
    }
    return actions;
  };


  return (
    <Spin spinning={loading}>
      <Comment
        actions={getActions(comment)}
        author={comment.user.full_name}
        avatar={<Avatar src={comment.user.avatar.small} alt={comment.user.full_name}/>}
        content={<p dangerouslySetInnerHTML={{ __html: comment.text }}/>}
        datetime={
          <Tooltip title={moment(comment.created_at * 1000).format('LLL')}>
            <span>{moment(comment.created_at * 1000).fromNow()}</span>
          </Tooltip>
        }
      >
        {replying && (
          <BoardTileCommentAdd
            comment={comment}
            reply={true}
            tile={tile}
            onCreate={onReplyCreated}
          />
        )}
        {comment.replies && comment.replies.map(reply => (
          <BoardTileComment
            key={reply.comment_id}
            tile={tile}
            comment={reply}
            onDeleted={onReplyDeleted}
          />
        ))}
      </Comment>
    </Spin>
  )
};