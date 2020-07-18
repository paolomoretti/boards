import getToken from '../data/getToken';

export const deleteBoard = (id: number) => {
  return fetch(`/api/v5/topic_boards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  });
};