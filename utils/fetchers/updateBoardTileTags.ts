import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';

export function updateBoardTileTags(boardId: number, tileId: number, tags: Array<string>): Promise<BoardTile> {
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/update_tags`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Token auth_token=${getToken()}`
      },
      body: JSON.stringify({ tags })
    })
      .then(res => res.json())
}