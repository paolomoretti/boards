import getToken from '../data/getToken';

export const getBoard = (boardId: number) => {
  return fetch(`/api/v7/topic_boards/${boardId}?include_tweets=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
    .then(res => res.topic_board)
};