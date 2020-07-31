import getToken from '../data/getToken';
import { TileComment } from '../../types/boards.types';

export const addBoardTileComment = (boardId: number, tileId: number, text: string): Promise<TileComment> => {
  const payload: any = {
    replies: [],
    text,
    type: "article"
  }
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(comment => ({
      ...comment,
      replies: []
    }))
};