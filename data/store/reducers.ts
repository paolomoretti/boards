import { AppState } from '../../types/app.types';
import { Action, ActionTypes } from './actions';
import getToken from '../../utils/data/getToken';
import { BoardTile } from '../../types/boards.types';

export const initialState = Object.freeze<AppState>({
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
  currentBoardItemsCount: 0
});

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_BOARDS:
      return { ...state, boards: [...action.payload]}

    case ActionTypes.ADD_BOARD_CONTENT:
      const tileMock: Partial<BoardTile> = {
        tile_type: 'note',
        note: {
          note: action.payload.text
        },
        loading: true
      }
      return { ...state, currentBoardTiles: [tileMock, ...state.currentBoardTiles!]};

    case ActionTypes.SET_BOARD_TILE_PARAMS:
      return { ...state, boardTilesParams: action.payload};

    case ActionTypes.UPDATE_CURRENT_BOARD_TILES:
      return { ...state, currentBoardTiles: [...action.payload]};

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