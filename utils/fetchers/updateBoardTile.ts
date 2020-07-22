import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';

export function updateBoardTile(boardId: number, tileId: number, update: any): Promise<BoardTile> {
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Token auth_token=${getToken()}`
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
}