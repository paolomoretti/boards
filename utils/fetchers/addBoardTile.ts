import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';
import { updateBoardTileTags } from './updateBoardTileTags';

export const addBoardTile = (content: { text: string; }, boardId: number, tags?: Array<string>): Promise<BoardTile> => {
  const payload: any = {
    new_tile_text: content.text
  }
  return fetch(`/api/v5/topic_boards/${boardId}/tiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then((tile: BoardTile) => {
      if (tags && tags.length > 0) {
        return updateBoardTileTags(boardId, tile.id, tags)
      } else {
        return tile;
      }
    })
};