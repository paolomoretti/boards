import axios from 'axios';
import getToken from '../data/getToken';
import { BoardTile } from '../../types/boards.types';

interface OnProgressCallback {
  (progress: any, fileId: any): void;
}
export const uploadBoardTileFile = (boardId: number, formData: FormData, onProgress: OnProgressCallback, fileId: any): Promise<BoardTile> => {
  return axios.request({
    method: 'POST',
    url: `/api/upload/v5/topic_boards/${boardId}/tiles`,
    data: formData,
    onUploadProgress: (p) => onProgress(p, fileId),
    headers: {
      'authorization': `Token auth_token=${getToken()}`
    },
  })
    .then(res => res.data);
}