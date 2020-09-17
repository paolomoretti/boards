import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import { Size, Zindex } from '../../styles/vars';
import { BoardHeader } from './BoardHeader';
import BoardCurrentFilter from './BoardCurrentFilter';
import BoardTilesList from './BoardTilesList';
import { Affix, Spin } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setBoardTilesParams, updateCurrentBoardItemsCount, updateCurrentBoardTiles } from '../../data/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams, getCurrentBoardTiles } from '../../data/store/selectors';
import { getBoardTiles } from '../../utils/fetchers/getBoardTiles';
import _ from 'lodash';
import { useApi } from '../shared/ApiProvider';

const AppWidthContainer = styled.div`
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  margin: 0 auto;
`;
const BoardHeaderContainer = styled(Affix)`
  z-index: ${Zindex.BOARD_HEADER};
`;
const LoadMoreContainer = styled.div`
  height: 70px;
  margin-top: 20px;
`;

export default function BoardContent({ board }: { board: Board; }) {
  const dispatch = useDispatch();
  const { request } = useApi();
  const getTilesParams = useSelector(getBoardTileParams);
  const boardTiles = useSelector(getCurrentBoardTiles);
  const [ isLoadingMore, setLoadingMore ] = useState(false);
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const [ lastFetchParams, setLastFetchParams ] = useState(getTilesParams);
  const [ lastBoard, setLastBoard ] = useState(board);

  const onLoadMore = async () => {
    if (isLoadingMore || !canLoadMore) {
      return;
    }
    setLoadingMore(true);
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, getTilesParams, {
      max_timestamp: boardTiles![boardTiles!.length - 1].created_at
    });
    dispatch(setBoardTilesParams(newParams));
  };

  useEffect(() => {
    if (board.id && (
      !boardTiles ||
      boardTiles.length === 0) ||
      JSON.stringify(lastFetchParams) !== JSON.stringify(getTilesParams) ||
      (lastBoard && board.id.toString() !== lastBoard.id.toString())
    ) {
      setLastFetchParams(getTilesParams);
      setLastBoard(board)
      request<{ results: Array<BoardTile>; num_found: number; }>(getBoardTiles, board.id, getTilesParams)
        .then(({ results, num_found }) => {
          setCanLoadMore(results.length === getTilesParams.per_page);
          const newBoardTiles = _.chain(isLoadingMore ? boardTiles : [])
            .concat(results)
            .uniqBy('id')
            .value();
          dispatch(updateCurrentBoardTiles(newBoardTiles));
          dispatch(updateCurrentBoardItemsCount(num_found));
          setLoadingMore(false);
        });
    }
  }, [board.id, getTilesParams]);

  return (
    <>
      <BoardHeaderContainer offsetTop={Size.HEADER_HEIGHT}>
        <BoardHeader board={board!} />
      </BoardHeaderContainer>
      <BoardCurrentFilter />
      {boardTiles && board && (
        <AppWidthContainer>
          <BoardTilesList
            tiles={boardTiles}
            board={board!}
            onLoadMore={onLoadMore}
          />
        </AppWidthContainer>
      )}
      <Spin tip={'Loading more ...'} spinning={isLoadingMore}>
        <LoadMoreContainer />
      </Spin>
    </>
  )
}
