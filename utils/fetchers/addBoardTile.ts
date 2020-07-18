import getToken from '../data/getToken';

export const addBoardTile = (content: { text: string; }, boardId: number) => {
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
};