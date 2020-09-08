import { AppState } from '../../types/app.types';
import { Action, ActionTypes } from './actions';
import getToken from '../../utils/data/getToken';
import { Board, BoardTile } from '../../types/boards.types';
import { appSearchDefault } from '../../utils/fetchers/appSearchDefault';

export const initialState = Object.freeze<AppState>({
  processing: false,
  boardTilesParams: {
    clean_description: true,
    exclude_sources: true,
    per_page: 15,
    include_all_comments: false,
    include_discussions: false,
    include_conversations: false,
    include_tweets: false,
  },
  token: getToken(),
  currentBoardTiles: [],
  currentBoardItemsCount: 0,

  searchKeyword: '',
  searchFetcher: appSearchDefault
});

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_PROCESSING:
      return { ...state, processing: action.payload };

    case ActionTypes.CLOSE_CURRENT_BOARD:
      return { ...state, currentBoardItemsCount: 0, currentBoardTiles: [] };

    case ActionTypes.UPDATE_BOARD:
      return { ...state, boards: [...(state.boards || []).map(board =>
        board.id === action.payload.id ? action.payload : board
      )]};

    case ActionTypes.UPDATE_BOARDS:
      if (action.payload) {
        const boards: Array<Board> = action.payload.sort((a: Board, b: Board) => b.last_activity_date - a.last_activity_date)
        return { ...state, boards: [...boards]}
      }
      return { ...state };

    case ActionTypes.ADD_BOARD_CONTENT:
      const tileMock: Partial<BoardTile> = {
        tile_type: 'note',
        note: {
          note: action.payload.text
        },
        user_tags: action.payload.user_tags || [],
        loading: true
      }
      return { ...state, currentBoardTiles: [tileMock, ...state.currentBoardTiles!]};

    case ActionTypes.SET_BOARD_TILE_PARAMS:
      return { ...state, boardTilesParams: action.payload};

    case ActionTypes.UPDATE_CURRENT_BOARD_TILES:
      return { ...state, currentBoardTiles: [...action.payload]};

    case ActionTypes.UPDATE_CURRENT_BOARD_TILE:
      const tiles: Array<BoardTile> = state.currentBoardTiles.map(tile =>
        tile.id === action.payload.id ? action.payload : tile
      )
      return { ...state, currentBoardTiles: [...tiles]};

    case ActionTypes.SET_CURRENT_BOARD:
      return { ...state, currentBoard: action.payload };

    case ActionTypes.UPDATE_CURRENT_BOARD_ITEMS_COUNT:
      return { ...state, currentBoardItemsCount: action.payload };

    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload};

    // User
    case ActionTypes.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload }};

    case ActionTypes.USER_LOGOUT:
      return { ...state, user: undefined, token: undefined};

  }
  return state;
}
