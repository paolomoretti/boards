import { BoardTile } from '../../types/boards.types';
import { StarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import * as React from 'react';
import { CSSProperties } from 'react';
import { updateCurrentBoardTile } from '../../data/store/actions';
import { updateBoardTileApproval } from '../../utils/fetchers/updateBoardTileApproval';
import { Colors } from '../../styles/vars';
import { HelpTooltip } from '../shared/HelpTooltip';

export const BoardTileStar = ({ tile, boardId }: { tile: BoardTile; boardId: number; }) => {
  const dispatch = useDispatch();
  const iconStyle: CSSProperties = {
    color: tile.approved ? Colors.PRIMARY : 'inherit'
  }

  const onStarredChange = () => {
    tile.approved = !tile.approved;
    dispatch(updateCurrentBoardTile(tile));
    updateBoardTileApproval(boardId, tile.id, tile.approved);
  };

  return (
    <HelpTooltip title="Click to approve/unapprove">
      <StarOutlined style={iconStyle} onClick={onStarredChange} />
    </HelpTooltip>
  )
};