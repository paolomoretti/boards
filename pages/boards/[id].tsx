import * as React from 'react';
import { useEffect, useState } from 'react';
import { Affix, message, Spin } from 'antd';
import LoggedPage from '../../components/layouts/LoggedPage';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getBoard } from '../../utils/fetchers/getBoard';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import BoardTilesList from '../../components/boards/BoardTilesList';
import styled from 'styled-components';
import _ from 'lodash';
import { BoardHeader } from '../../components/boards/BoardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams, getCurrentBoardTiles } from '../../data/store/selectors';
import {
  setBoardTilesParams,
  setCurrentBoard,
  updateCurrentBoardItemsCount,
  updateCurrentBoardTiles
} from '../../data/store/actions';
import { getBoardTiles } from '../../utils/fetchers/getBoardTiles';
import BoardCurrentFilter from '../../components/boards/BoardCurrentFilter';
import { Size, Zindex } from '../../styles/vars';

const LoadMoreContainer = styled.div`
  height: 70px;
  margin-top: 20px;
`;
const AppWidthContainer = styled.div`
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  margin: 0 auto;
`;
const BoardHeaderContainer = styled(Affix)`
  z-index: ${Zindex.BOARD_HEADER};
`;

export default function SingleBoardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const getTilesParams = useSelector(getBoardTileParams);
  const boardTiles = useSelector(getCurrentBoardTiles);
  const [ isLoadingMore, setLoadingMore ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const [ lastFetchParams, setLastFetchParams ] = useState(getTilesParams);
  const [ lastLoadedBoard, setLastLoadedBoard ] = useState();
  const { id } = router.query as { id: string; };
  let { data: board, error }: { data?: Board; error?: any; } = useSWR(`/boards/${id}`, () => {
    return getBoard(parseInt(id))
      .then((b: Board) => {
        dispatch(setCurrentBoard(b));
        setLastLoadedBoard(b);
        return b;
      });
  });

  if (error) {
    return message.error(error);
  }

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
    if (id && (
      !boardTiles ||
      boardTiles.length === 0) ||
      JSON.stringify(lastFetchParams) !== JSON.stringify(getTilesParams) ||
      (lastLoadedBoard && id.toString() !== lastLoadedBoard.id.toString())
    ) {
      setLastFetchParams(getTilesParams);
      if (!isLoadingMore) {
        setLoading(true);
      }
      getBoardTiles(parseInt(id), getTilesParams).then(({ results, num_found }: { results: Array<BoardTile>; num_found: number; }) => {
        setCanLoadMore(results.length === getTilesParams.per_page);
        const newBoardTiles = _.chain(isLoadingMore ? boardTiles : [])
          .concat(results)
          .uniqBy('id')
          .value();
        dispatch(updateCurrentBoardTiles(newBoardTiles));
        dispatch(updateCurrentBoardItemsCount(num_found));
        setLoading(false);
        setLoadingMore(false);
      });
    }
  }, [id, getTilesParams]);

  return (
    <LoggedPage>
      <Spin spinning={!board || isLoading}>
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
      </Spin>
    </LoggedPage>
  );
}
