import { createSelector } from 'reselect';
import { AppState, User } from '../../types/app.types';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';

export const app = (state: { app: AppState }): AppState => state.app;

export const getBoards = createSelector([app], (app): Array<Board> | undefined => app.boards);
export const getBoardTileParams = createSelector([app], (app): GetBoardTilesParams => app.boardTilesParams);
export const getCurrentBoard = createSelector([app], (app): Board | undefined => app.currentBoard);
export const getCurrentBoardTiles = createSelector([app], (app): Array<BoardTile> => app.currentBoardTiles);
export const getCurrentBoardItemsCount = createSelector([app], (app): number => app.currentBoardItemsCount);
export const getUser = createSelector([app], (app): User | undefined => app.user);
export const getToken = createSelector([app], (app): string | undefined => app.token);
export const isLoading = createSelector([app], (app): boolean => app.loading);
export const isLoadingFirstTiles = createSelector([app], (app): boolean =>
  app.loading && app.currentBoardTiles.length === 0
);
