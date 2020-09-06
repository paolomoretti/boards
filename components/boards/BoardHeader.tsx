import {Button, Dropdown, Input, Menu, Modal, PageHeader, Space, Spin} from 'antd';
import * as React from 'react';
import {lazy, Suspense, SyntheticEvent, useState} from 'react';
import {useRouter} from 'next/router';
import styled, {CSSProperties} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {addBoardContent, setBoardTilesParams, updateCurrentBoardTiles} from '../../data/store/actions';
import {addBoardTile} from '../../utils/fetchers/addBoardTile';
import {getBoardTileParams, getCurrentBoardTiles} from '../../data/store/selectors';
import {Board, BoardTile, GetBoardTilesParams} from '../../types/boards.types';
import BoardTileTagsSelector from './BoardTileTagsSelector';
import {BoardTitle} from './BoardTitle';
import BoardTileApprovedSelector from './BoardTileApprovedSelector';
import {Shadows, Size} from '../../styles/vars';
import AddBoardContentButton from './AddBoardContentButton';
import {isMobile} from '../../utils/isMobile';
import {CloseOutlined, FilterOutlined, SettingOutlined} from '@ant-design/icons';

const ModalAddBoardContent = lazy(() => import('../modals/ModalAddBoardContent'));

const { Search } = Input;
const Container = styled.div`
  background-color: white;
`;
const MobileActionsDropdown = styled(Space)`
  padding: 5px 10px;
`;
const PageHeaderStyled = styled(PageHeader)`
  box-shadow: ${Shadows.HEADER};
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  margin: 0 auto;

  .ant-page-header-heading-title {
    line-height: 1em;
  }
  .ant-page-header-heading {
    flex-wrap: nowrap;
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

export const BoardHeader = ({ board, settings }: { board: Board; settings?: boolean; }) => {
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const boardTiles: Array<BoardTile> = useSelector(getCurrentBoardTiles);
  const getTileParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);

  if (!board) {
    return null;
  }

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
    };
    const modal = Modal.info({
      title: 'Add content',
      content: (
        <Suspense fallback={<Spin spinning={true} />}>
          <ModalAddBoardContent boardId={board.id} onClose={modalClose} onAdd={onAdd} />
        </Suspense>
      ),
      className: 'modal-no-buttons',
      maskClosable: true
    });
  };
  const onMobileFiltersVisibilityChange = (visible: boolean) => {
    setShowMobileFilters(visible);
  };

  const onSearchChanged = (keyword: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, getTileParams, { search_text: keyword });
    dispatch(setBoardTilesParams(newParams));
  };

  const onHeaderClick = (e: SyntheticEvent) => {
    if (e.target && (e.target as HTMLDivElement).className === 'ant-page-header-heading') {
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }
  };

  const Filters = [
    <BoardTileTagsSelector key={'tags'} />,
    <BoardTileApprovedSelector key={'star'} />,
    <Search
      style={{maxWidth: 200}}
      key={'search'}
      placeholder={`Search on board ${board && board.name}`}
      onSearch={onSearchChanged}
    />
  ];
  const Actions = isMobile() ?
    [
      <Dropdown placement="bottomCenter" trigger={['click']} visible={showMobileFilters} onVisibleChange={onMobileFiltersVisibilityChange} overlay={(
        <Menu selectable={true}>
          <MobileActionsDropdown size={5}>
            {Filters}
          </MobileActionsDropdown>
        </Menu>
      )}>
        <Button type={'text'} key={'show-filters'} icon={<FilterOutlined />} shape={'circle'} />
      </Dropdown>
    ] : [
      ...Filters,
      isMobile() && <Button key={'close-filters'} icon={<CloseOutlined />} type={'text'} />
    ];
  Actions.push(
    <Button key={'show-settings'} icon={<SettingOutlined />} shape={'circle'} type={"text"} onClick={() =>
      router.push(`/boards/[id]/settings`, `/boards/${board.id}/settings`)
    }/>
  );

  return (
    <Container onClick={onHeaderClick}>
      <PageHeaderStyled
        title={<BoardTitle board={board} />}
        onBack={() => router.push(`/boards/[id]`, `/boards/${board.id}`, { shallow: true })}
        style={pageHeaderStyle}
        extra={settings ? [<h3>Settings</h3>] : Actions}
      />
      {!settings && <AddBoardContentButton addContent={addContent} />}
    </Container>
  );
};
