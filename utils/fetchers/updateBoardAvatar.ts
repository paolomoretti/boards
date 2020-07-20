import getToken from '../data/getToken';

export const updateBoardAvatar = (boardId: number, formData: FormData) => {
  return fetch(`/api/v5/topic_boards/${boardId}/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': `Token auth_token=${getToken()}`
      },
      body: formData
    })
      .then(res => res.json());
}