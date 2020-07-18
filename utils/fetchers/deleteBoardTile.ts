import getToken from '../data/getToken';

export function deleteBoardTile(boardId: number, tileId: number): Promise<void> {
  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Token auth_token=${getToken()}`
      }
    })
      .then(res => res.json())
}