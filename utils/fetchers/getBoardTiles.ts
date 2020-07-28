import { BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import getToken from '../data/getToken';

export const getBoardTiles = (boardId: number, params: GetBoardTilesParams): Promise<{ results: Array<BoardTile>; num_found: number; }> => {
  if (!boardId) {
    return Promise.resolve({ results: [], num_found: 0 });
  }
  const queryParams: string = Object.keys(params).reduce((paramsString: string, paramKey: any) => {
    if (paramKey === 'filters') {
      // @ts-ignore
      return `${paramsString}&filters[]=${encodeURIComponent(params[paramKey].join(','))}`
    }
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
    .then(res => {
      res.results = res.results.map((tile: BoardTile) => {
        if (tile.tile_type === 'link') {

        }
        return tile;
      });
      return res;
    })
}
