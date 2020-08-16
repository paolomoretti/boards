import { Button, Input, Modal, PageHeader } from 'antd';
import * as React from 'react';
import { useRouter } from 'next/router';
import styled, { CSSProperties } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addBoardContent, setBoardTilesParams, updateCurrentBoardTiles } from '../../data/store/actions';
import { ModalAddBoardContent } from '../modals/ModalAddBoardContent';
import { addBoardTile } from '../../utils/fetchers/addBoardTile';
import { getBoardTileParams, getCurrentBoardTiles } from '../../data/store/selectors';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import BoardTileTagsSelector from './BoardTileTagsSelector';
import { BoardTitle } from './BoardTitle';
import BoardTileApprovedSelector from './BoardTileApprovedSelector';
import { Shadows, Size } from '../../styles/vars';
import AddBoardContentButton from './AddBoardContentButton';
import { SyntheticEvent, useState } from 'react';
import { isMobile } from '../../utils/isMobile';
import { FilterOutlined, CloseOutlined } from '@ant-design/icons';

const { Search } = Input;
const Container = styled.div`
  background-color: white;
`;
const PageHeaderStyled = styled(PageHeader)`
  box-shadow: ${Shadows.HEADER};
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  margin: 0 auto;

  .ant-page-header-heading-title {
    line-height: 1em;
  }
  .show-mobile {
    display: none;
  }
  
  @media only screen and (max-width: 500px) {
    .ant-page-header-heading-extra {
      text-align: right;
      margin: 7px -15px 0;
      
      > * {
        margin: 0 0 5px 10px;
      }
      .show-mobile {
        display: inherit;
      }
    }
  }
`;

export const BoardHeader = ({ board }: { board: Board; }) => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  if (!board) {
    return null;
  }

  const router = useRouter();
  const dispatch = useDispatch();
  const boardTiles: Array<BoardTile> = useSelector(getCurrentBoardTiles);
  const getTileParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const pageHeaderStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '5px 24px'
  };

  const addContent = () => {
    const modalClose = () => modal.destroy();
    const onAdd = (content: string | BoardTile, tags?: Array<string>) => {
      if (typeof content === 'string') {
        dispatch(addBoardContent({ text: content, boardId: board.id, user_tags: tags || [] }));
        addBoardTile({ text: content }, board.id, tags)
          .then(newTile => dispatch(updateCurrentBoardTiles([newTile, ...boardTiles])))
          .catch(console.error)
      } else {
        // File upload, we have the tile already
        dispatch(updateCurrentBoardTiles([content, ...boardTiles]))
      }
      modalClose();
    }
    const modal = Modal.info({
      title: 'Add content',
      content: <ModalAddBoardContent boardId={board.id} onClose={modalClose} onAdd={onAdd} />,
      className: 'modal-no-buttons',
      maskClosable: true
    });
  }

  const onSearchChanged = (keyword: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, getTileParams, { search_text: keyword });
    dispatch(setBoardTilesParams(newParams));
  }

  const onHeaderClick = (e: SyntheticEvent) => {
    if (e.target && (e.target as HTMLDivElement).className === 'ant-page-header-heading') {
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }
  }

  const Filters = isMobile() && !showMobile ?
    [
      <Button icon={<FilterOutlined />} shape={'circle'} onClick={() => setShowMobile(true)} />
    ] : [
      <BoardTileTagsSelector key={'tags'} />,
      <BoardTileApprovedSelector />,
      <Search
        style={{maxWidth: 200}}
        key={'search'}
        placeholder={`Search on board ${board && board.name}`}
        onSearch={onSearchChanged}
      />,
      isMobile() && <Button icon={<CloseOutlined />} type={'text'} onClick={() => setShowMobile(false)} />
    ];

  return (
    <Container onClick={onHeaderClick}>
      <PageHeaderStyled
        title={<BoardTitle board={board} />}
        onBack={() => router.push(`/`, '/', { shallow: true })}
        style={pageHeaderStyle}
        extra={Filters}
      />
      <AddBoardContentButton addContent={addContent} />
    </Container>
  );
};