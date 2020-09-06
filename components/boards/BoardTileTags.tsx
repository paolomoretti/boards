import * as React from 'react';
import { Tag } from 'antd';
import { Board, BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams, getCurrentBoard } from '../../data/store/selectors';
import { setBoardTilesParams, setCurrentBoard, updateCurrentBoardTile } from '../../data/store/actions';
import * as _ from 'lodash';
import styled from 'styled-components';
import AddTag from '../shared/AddTag';
import { updateBoardTileTags } from '../../utils/fetchers/updateBoardTileTags';
import { getBoard } from '../../utils/fetchers/getBoard';

const ClickableTag = styled(Tag)`
  cursor: pointer;
  margin-bottom: 4px;
`;

export default function BoardTileTags({ tile }: { tile: BoardTile; }) {
  const dispatch = useDispatch();
  const tilesParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const board: Board | undefined = useSelector(getCurrentBoard);
  const tags: Array<string> = tilesParams.tags ? tilesParams.tags.toLowerCase().split(',') : [];
  const tagOptions: Array<{ value: string; }> = (board && board.board_tags || []).map(t => ({ value: t }));

  if (!tile.user_tags) {
    return null;
  }

  const onChangeTagsList = (tagsList: Array<string>) => {
    const updatedTile: BoardTile = {
      ...tile,
      user_tags: tagsList
    };
    dispatch(updateCurrentBoardTile(updatedTile));
    updateBoardTileTags(board!.id, tile.id, tagsList)
      .then(() => getBoard(board!.id))
      .then((b: Board) => dispatch(setCurrentBoard(b)));
  };

  const onSetTag = (tag: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, tilesParams, {
      tags: _.chain(tags).concat(tag).uniq().value().join(',')
    });
    dispatch(setBoardTilesParams(_.omit(newParams, 'max_timestamp')));
  };

  const removeTag = (tag: string) => {
    tag = tag.toLowerCase();
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, tilesParams, {
      tags: _.chain(tags).without(tag).value().join(',')
    });
    if (tags.indexOf(tag) > -1) {
      // selected - should not remove it from the tile
      dispatch(setBoardTilesParams(_.omit(newParams, 'max_timestamp')));
    } else {
      const updatedTagsList: Array<string> = tile.user_tags.filter(t => t !== tag);
      onChangeTagsList(updatedTagsList);
    }
  };

  const onAddTag = (tag: string) => {
    const updatedTagsList: Array<string> = _.uniq([...tile.user_tags, tag]);
    onChangeTagsList(updatedTagsList);
  };

  return (
    <div>
      { tile.user_tags.map(tag => {
        const selected: boolean = tags.indexOf(tag) > -1;
        return (
          <ClickableTag
            key={tag}
            color={selected ? 'orange' : 'default'}
            onClick={() => onSetTag(tag)}
            closable={true}
            onClose={() => removeTag(tag)}
          >
            {tag}
          </ClickableTag>
        )
      })}
      <AddTag
        options={tagOptions}
        onAddTag={onAddTag}
      />
    </div>
  );
}
