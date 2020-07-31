import getToken from '../data/getToken';

export const deleteBoardTileComment = (commentId: number, commentThreadId: number, boardId: number, tileId: number): Promise<void> => {
  return fetch(`/api/v3/comment/${commentId}?comment_thread_id=${commentThreadId}&topic_board_id=${boardId}&tile_id=${tileId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Token auth_token=${getToken()}`
    }
  })
    .then(res => res.json())
};