import getToken from '../data/getToken';

export const updateBoardAvatar = (boardId: number, formData: FormData): Promise<{ status?: 'ok', errors?: Array<string>; }> => {
  return fetch(`/api/v5/topic_boards/${boardId}/avatar`, {
      method: 'POST',
      headers: {
        'authorization': `Token auth_token=${getToken()}`
      },
      body: formData
    })
      .then(res => res.json());
}