import * as React from 'react';
import { useEffect } from 'react';
import { Spin } from 'antd';
import LoggedPage from '../../../components/layouts/LoggedPage';
import { useRouter } from 'next/router';
import { getBoard } from '../../../utils/fetchers/getBoard';
import { Board } from '../../../types/boards.types';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '../../../components/shared/ApiProvider';
import { setCurrentBoard } from '../../../data/store/actions';
import { getBoards, getCurrentBoard, isLoadingFirstTiles } from '../../../data/store/selectors';
import BoardContent from '../../../components/boards/BoardContent';

export default function SingleBoardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentBoard);
  const boards = useSelector(getBoards);
  const isGettingCurrentBoardFirstTiles = useSelector(isLoadingFirstTiles);
  const { request } = useApi();
  const { id } = router.query as { id: string; };

  useEffect(() => {
    if (!id || (currentBoard && id.toString() === currentBoard.id.toString())) {
      return;
    }
    if (boards && _.find(boards, b => b.id.toString() === id.toString())) {
      // Use cached version
      dispatch(setCurrentBoard(_.find(boards, b => b.id.toString() === id.toString())!));
    }
    request<Board>(getBoard, parseInt(id))
      .then(board => dispatch(setCurrentBoard(board)));

    return () => {
      dispatch(setCurrentBoard(null));
    }
  }, [id]);

  return (
    <LoggedPage>
      <Spin spinning={!currentBoard || isGettingCurrentBoardFirstTiles}>
        {currentBoard && <BoardContent board={currentBoard} />}
      </Spin>
    </LoggedPage>
  );
}
