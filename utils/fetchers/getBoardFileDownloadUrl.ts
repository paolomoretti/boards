import getToken from '../data/getToken';

export const getBoardFileDownloadUrl = (boardId: number, tileId: number): Promise<{ url: string | null}> => {
  if (!boardId || !tileId) {
    return Promise.resolve({ url: null });
  }

  return fetch(`/api/v5/topic_boards/${boardId}/tiles/${tileId}/generate_download_url`, {
    method: 'GET',
    headers: { 'authorization': `Token auth_token=${getToken()}` }
  })
    .then(res => res.json())
    .catch(() => ({ url: null }))
}
