import getToken from '../data/getToken';

export const addBoard = (name: string) => {
  return fetch(`/api/v10/topic_boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    },
    body: JSON.stringify({ name })
  })
    .then(res => res.json())
    .then(res => res.topic_board)
    .then(res => ({
      ...res,
      avatar: res.avatar.medium
    }))
};