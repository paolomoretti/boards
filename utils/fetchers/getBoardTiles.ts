import { BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import getToken from '../data/getToken';

export const getBoardTiles = (boardId: number, params: GetBoardTilesParams): Promise<{ results: Array<BoardTile>; num_found: number; }> => {
  if (!boardId) {
    return Promise.resolve({ results: [], num_found: 0 });
  }
  const queryParams: string = Object.keys(params).reduce((paramsString: string, paramKey: any) => {
    // @ts-ignore
    return `${paramsString}&${paramKey}=${encodeURIComponent(params[paramKey])}`;
  }, '')
  return fetch(`/api/v10/topic_boards/${boardId}/tiles?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
}
