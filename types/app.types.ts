import { Board, BoardSearchResult, BoardTile, GetBoardTilesParams } from './boards.types';

export interface AppState {
  loading: boolean;
  searchKeyword: string;
  searchFetcher(keyword: string): Promise<{ results: Array<BoardSearchResult>; total_count: number; }>;
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
