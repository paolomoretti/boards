import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';

export function updateBoardTileApproval(boardId: number, tileId: number, approved: boolean): Promise<BoardTile> {
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/editor_approved`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Token auth_token=${getToken()}`
      },
      body: JSON.stringify({ approved })
    })
      .then(res => res.json())
}