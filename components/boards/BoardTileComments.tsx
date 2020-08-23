import { Board, BoardTile, TileComment } from '../../types/boards.types';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getBoardTileComments } from '../../utils/fetchers/getBoardTileComments';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBoard } from '../../data/store/selectors';
import { BoardTileCommentAdd } from './BoardTileCommentAdd';
import { updateCurrentBoardTile } from '../../data/store/actions';
import { BoardTileComment } from './BoardTileComment';
import * as _ from 'lodash';

const Container = styled.div`
  margin: 1em 0 0;
  
  .ant-comment {
    .ant-comment-inner {
      padding-bottom: 0;
    }
    .ant-comment-actions {
      margin-top: .2em;
    }
  }
`;

export const BoardTileComments = ({ tile }: { tile: BoardTile; }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Array<TileComment> | null>(null);
  const board: Board = useSelector(getCurrentBoard)!;

  useEffect(() => {
    if (!loading && comments === null) {
      setLoading(true);
      getBoardTileComments(board.id, tile.id)
        .then(setComments)
        .then(() => setLoading(false));
    }
  });

  const onCreateNewComment = (comment: TileComment) => {
    tile.comment_count++;
    dispatch(updateCurrentBoardTile({ ...tile }));
    setComments([comment, ...(comments || [])]);
  }

  const onCommentDeleted = (commentId: number) => {
    tile.comment_count--;
    dispatch(updateCurrentBoardTile({ ...tile }));
    // remove comment from replies (if a reply)
    const _comments = (comments || []).map(c => {
      c.replies = _.reject(c.replies, r => r.comment_id === commentId);
      return c;
    })
    // remove comment from list (if not reply)
    setComments(_.reject(_comments, c => c.comment_id === commentId));
  }

  const onCommentReplied = (reply: TileComment) => {
    tile.comment_count++;
    dispatch(updateCurrentBoardTile({ ...tile }));
    setComments((comments || []).map(comment => {
      if (comment.comment_thread_id === reply.comment_thread_id) {
        comment.replies = [...comment.replies, reply];
      }
      return comment;
    }));
  }

  return (
    <Container>
      <Spin spinning={loading}>
        <h4>Comments</h4>
        <BoardTileCommentAdd tile={tile} onCreate={onCreateNewComment} />
        {comments !== null && comments.map(comment => (
          <BoardTileComment
            key={comment.comment_id}
            comment={comment}
            tile={tile}
            onDeleted={onCommentDeleted}
            onReplied={onCommentReplied}
          />
        ))}
      </Spin>
    </Container>
  )
};