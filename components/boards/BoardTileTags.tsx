import * as React from 'react';
import { Tag } from 'antd';
import { BoardTile, GetBoardTilesParams } from '../../types/boards.types';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams } from '../../data/store/selectors';
import { setBoardTilesParams } from '../../data/store/actions';
import * as _ from 'lodash';
import styled from 'styled-components';

const ClickableTag = styled(Tag)`
  cursor: pointer;
`

export default function BoardTileTags({ tile }: { tile: BoardTile; }) {
  const dispatch = useDispatch();
  const tilesParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const tags: Array<string> = tilesParams.tags ? tilesParams.tags.split(',') : [];

  if (!tile.user_tags || tile.user_tags.length === 0) {
    return null;
  }

  const onSetTag = (tag: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, tilesParams, {
      tags: _.chain(tags).concat(tag).uniq().value().join(',')
    })
    dispatch(setBoardTilesParams(_.omit(newParams, 'max_timestamp')));
  };

  const removeTag = (tag: string) => {
    const newParams: Partial<GetBoardTilesParams> = Object.assign({}, tilesParams, {
      tags: _.chain(tags).without(tag).value().join(',')
    })
    dispatch(setBoardTilesParams(_.omit(newParams, 'max_timestamp')));
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
            closable={selected}
            onClose={() => removeTag(tag)}
          >
            {tag}
          </ClickableTag>
        )
      })}
    </div>
  );
}