import getToken from '../data/getToken';
import { TileComment } from '../../types/boards.types';

export const addBoardTileCommentReply = (boardId: number, tileId: number, commentId: number, threadId: number, text: string): Promise<TileComment> => {
  const payload: any = {
    replies: [],
    text,
    type: "article"
  }
  return fetch(`/api/v3/comment/${commentId}?comment_thread_id=${threadId}&topic_board_id=${boardId}&tile_id=${tileId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
};