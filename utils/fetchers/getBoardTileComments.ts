import { TileComment } from '../../types/boards.types';
import getToken from '../data/getToken';

export const getBoardTileComments = (boardId: number, tileId: number): Promise<Array<TileComment>> => {
  if (!boardId || !tileId) {
    return Promise.resolve([]);
  }
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/comments?include_replies=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
}
