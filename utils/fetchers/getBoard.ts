export const getBoard = (token: string, boardId: number) => {
  return fetch(`/api/v7/topic_boards/${boardId}?include_tweets=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${token}`
    }
  })
    .then(res => res.json())
    .then(res => res.topic_board)
};