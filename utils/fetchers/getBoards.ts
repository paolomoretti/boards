import getToken from '../data/getToken';

export const getBoards = () => {
  return fetch('/api/v6/topic_boards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
};