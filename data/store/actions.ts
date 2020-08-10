import { ModalType, User } from '../../types/app.types';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';

export enum ActionTypes {
  // App / generic
  SET_TOKEN,
  SHOW_MODAL,
  SET_APP_SEARCH,

  // Boards
  // UNSHIFT_BOARD_TILE,
  UPDATE_BOARD,
  UPDATE_BOARDS,
  UPDATE_CURRENT_BOARD_TILES,
  UPDATE_CURRENT_BOARD_TILE,
  UPDATE_CURRENT_BOARD_ITEMS_COUNT,
  SET_CURRENT_BOARD,
  CLOSE_CURRENT_BOARD,
  SET_BOARD_TILE_PARAMS,
  ADD_BOARD_CONTENT,

  // User
  SET_USER,
  USER_LOGOUT,
}

// export const ActionTypes: Record<string, string> = {
//   SET_BOARD_TILE_PARAMS: 'SET_BOARD_TILE_PARAMS',
// };

export type Action = {
  type: ActionTypes;
  payload?: any;
};

export const setBoardTilesParams = (params: Partial<GetBoardTilesParams>) => ({
  type: ActionTypes.SET_BOARD_TILE_PARAMS,
  payload: params
});

// export const unshiftBoardTile = (tile: BoardTile) => ({
//   type: ActionTypes.UNSHIFT_BOARD_TILE,
//   payload: tile
// });

export const updateCurrentBoardTiles = (tiles: Array<BoardTile>) => ({
  type: ActionTypes.UPDATE_CURRENT_BOARD_TILES,
  payload: tiles
});

export const updateCurrentBoardTile = (tile: BoardTile) => ({
  type: ActionTypes.UPDATE_CURRENT_BOARD_TILE,
  payload: tile
});

export const updateCurrentBoardItemsCount = (count: number) => ({
  type: ActionTypes.UPDATE_CURRENT_BOARD_ITEMS_COUNT,
  payload: count
});

export const updateBoard = (board: Board) => ({
  type: ActionTypes.UPDATE_BOARD,
  payload: board
});

export const updateBoards = (boards: Array<Board>) => ({
  type: ActionTypes.UPDATE_BOARDS,
  payload: boards
});

export const setCurrentBoard = (board: Board) => ({
  type: ActionTypes.SET_CURRENT_BOARD,
  payload: board
});

export const closeCurrentBoard = () => ({
  type: ActionTypes.CLOSE_CURRENT_BOARD
});

export const addBoardContent = (content: { text: string; boardId: number; user_tags?: Array<string> }) => ({
  type: ActionTypes.ADD_BOARD_CONTENT,
  payload: content
});

export const setToken = (token: string | undefined) => ({
  type: ActionTypes.SET_USER,
  payload: token
});

export const showModal = (modal: ModalType, params: Record<string, any> = {}) => ({
  type: ActionTypes.SHOW_MODAL,
  payload: { modal, params }
});

export const updateAppSearch = (keyword: string) => ({
  type: ActionTypes.SET_APP_SEARCH,
  payload: keyword
});

// User
export const setUser = (user: User | undefined) => ({
  type: ActionTypes.SET_USER,
  payload: user
});

export const doLogout = () => ({
  type: ActionTypes.USER_LOGOUT
});
