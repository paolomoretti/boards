import { Button, Modal, PageHeader, Typography } from 'antd';
import * as React from 'react';
import { useRouter } from 'next/router';
import styled, { CSSProperties } from 'styled-components';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addBoardContent, setBoardTilesParams, updateCurrentBoardTiles } from '../../data/store/actions';
import { ModalAddBoardContent } from '../modals/ModalAddBoardContent';
import { addBoardTile } from '../../utils/fetchers/addBoardTile';
import { getBoardTileParams, getCurrentBoardItemsCount, getCurrentBoardTiles } from '../../data/store/selectors';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import BoardTileTagsSelector from './BoardTileTagsSelector';

const { Text } = Typography;
const ItemsCountSpan = styled(Text)`
  font-size: 13px;
  margin-left: 13px;
  font-weight: 300;
`

export const BoardHeader = ({ board }: { board: Board; }) => {
  if (!board) {
    return null;
  }

  const router = useRouter();
  const dispatch = useDispatch();
  const boardTiles: Array<BoardTile> = useSelector(getCurrentBoardTiles);
  const getTileParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const itemsCount: number = useSelector(getCurrentBoardItemsCount);
  const pageHeaderStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '5px 24px'
  };

  const addContent = () => {
    const modalClose = () => modal.destroy();
    const onAdd = (text: string) => {
      dispatch(addBoardContent({ text, boardId: board.id }));
      addBoardTile({ text }, board.id)
        .then(newTile => dispatch(updateCurrentBoardTiles([newTile, ...boardTiles])))
        .catch(console.error)
      modalClose();
    }
    const modal = Modal.info({
      title: 'Add content',
      content: <ModalAddBoardContent boardId={board.id} onClose={modalClose} onAdd={onAdd} />,
      className: 'modal-no-buttons'
    });
  }

  const onSearchChanged = (keyword: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, getTileParams, { search_text: keyword });
    dispatch(setBoardTilesParams(newParams));
  }

  return (
    <PageHeader
      title={([
        <span key={'title'}>{board ? board.name : 'Loading ...'}</span>,
        itemsCount && <ItemsCountSpan key={'count'} type={'secondary'}>{itemsCount} items</ItemsCountSpan>
      ])}
      onBack={() => router.push(`/`, '/', { shallow: true })}
      style={pageHeaderStyle}
      extra={[
        <BoardTileTagsSelector key={'tags'} board={board} />,
        <Search
          style={{maxWidth: 200}}
          key={'search'}
          placeholder={`Search on board ${board && board.name}`}
          onSearch={onSearchChanged}
        />,
        <Button key={'add-button'} icon={<PlusOutlined />} onClick={addContent} type="primary">Add</Button>
      ]}
    />
  );
};