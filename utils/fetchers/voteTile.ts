import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';

export const voteTile = (vote: number, tileId: number, boardId: number): Promise<BoardTile> => {
  const payload: any = {
    downvote: vote < 0,
    upvote: vote > 0
  }
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/vote`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => res.tile)
};