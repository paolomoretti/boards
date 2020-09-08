import { ModalProps } from 'antd/lib/modal';
import { Board, BoardSearchResult, BoardTile, GetBoardTilesParams } from './boards.types';

export interface AppState {
  searchKeyword: string;
  searchFetcher(keyword: string): Promise<{ results: Array<BoardSearchResult>; total_count: number; }>;
  guest?: boolean;
  token?: string;
  user?: User;
  processing: boolean;

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
