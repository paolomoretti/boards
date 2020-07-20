import { ModalProps } from 'antd/lib/modal';
import { Board, BoardTile, GetBoardTilesParams } from './boards.types';

export interface AppState {
  guest?: boolean;
  token?: string;
  user?: User;

  boards?: Array<Board>;
  boardTilesParams: GetBoardTilesParams;
  currentBoard?: Board;
  currentBoardTiles: Array<BoardTile>;
  currentBoardItemsCount: number;
}

export interface User {
  id: number;
  full_name: string;
  avatar: {
    small: string;
  };
}

export enum ModalType {
  ADD_BOARD_CONTENT
}
export const ModalsMap: Record<ModalType, ModalProps> = {
  [ModalType.ADD_BOARD_CONTENT]: {
    centered: true,
    title: 'Add content'
  }
}