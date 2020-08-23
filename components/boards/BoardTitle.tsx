import * as React from 'react';
import { Board } from '../../types/boards.types';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards, getCurrentBoard, getCurrentBoardItemsCount } from '../../data/store/selectors';
import {Divider, Dropdown, Menu, Space, Typography} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import { updateBoards } from '../../data/store/actions';
import { getBoards as fetchBoards } from '../../utils/fetchers/getBoards';
import {UserBadge} from "../shared/UserBadge";

const { Text } = Typography;
const TitleContainer = styled.h3`
  display: inline-block;
  padding: 0 5px;
  margin: 0;
  cursor: pointer;
  
  &:hover {
    border-radius: 2px;
    background-color: #eee;
  }
`;
const SpaceStyled = styled(Space)`
  margin-left: 4px;
  font-size: 13px;
  font-weight: 300;
`;

interface BoardTitleProps {
  board: Board;
}

export const BoardTitle = ({ board }: BoardTitleProps) => {
  const dispatch = useDispatch();
  const itemsCount: number = useSelector(getCurrentBoardItemsCount);
  const currentBoard: Board | undefined = useSelector(getCurrentBoard);
  const boards: Array<Board> | undefined = useSelector(getBoards);

  if (!boards) {
    fetchBoards().then(boards => dispatch(updateBoards(boards)));
  }
  const menu = (
    <Menu selectable={true} style={{maxHeight: 300, overflowY: 'auto'}}>
      {!boards ? null : boards!.map((board: Board) => (
        currentBoard && currentBoard.id === board.id ? null : (
          <Menu.Item key={board.id}>
            <Link href={'/boards/[id]'} as={`/boards/${board.id}`}>
              <a>{board.name}</a>
            </Link>
          </Menu.Item>
        )
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} overlayClassName={'something'} trigger={['click']}>
        <TitleContainer onClick={e => e.preventDefault()}>
          {board ? (
            <span>{board.name} <CaretDownOutlined style={{fontSize: 13, margin: '0 0 2px 0px'}} /></span>
          ): 'Loading ...'}
        </TitleContainer>
      </Dropdown>
      <Divider type={'vertical'} />
      <SpaceStyled size={5}>
        <UserBadge size={22} user={board.owner} />
        {itemsCount && <Text key={'count'} type={'secondary'}>{itemsCount} items</Text>}
      </SpaceStyled>
    </>
  )
}
