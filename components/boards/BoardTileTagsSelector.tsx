import * as React from 'react';
import { Button, Checkbox, Dropdown, Menu, Input } from 'antd';
import { Board, GetBoardTilesParams } from '../../types/boards.types';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import * as _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams, getCurrentBoard } from '../../data/store/selectors';
import { setBoardTilesParams } from '../../data/store/actions';
import { stopBubblingUp } from '../../utils/events/stopBubblingUp';

export default function BoardTileTagsSelector() {
  const dispatch = useDispatch();
  const board: Board = useSelector(getCurrentBoard)!;

  if (!board.board_tags || board.board_tags.length === 0) {
    return null;
  }
  const tileParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const [keyword, setKeyword] = useState<string | undefined>();
  const [options, setOptions] = useState<Array<string>>(board.board_tags);

  const onTagClick = (e: any) => {
    const tag: string = e.nativeEvent.target.value;
    let newTagsList: Array<string> = tileParams.tags ? tileParams.tags.split(',') : [];
    if (e.nativeEvent.target.checked) {
      newTagsList = _.chain(newTagsList).concat(tag).uniq().value();
    } else {
      newTagsList = _.chain(newTagsList).without(tag).value();
    }
    const newParams: Partial<GetBoardTilesParams> = _.omit(Object.assign({}, tileParams, {
      tags: newTagsList.join(',')
    }), 'max_timestamp');
    dispatch(setBoardTilesParams(newParams));
  }

  const onSearch = (searchText: string) => {
    const newOptions: Array<string> = _.chain(board.board_tags)
      .filter(tag => tag.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || searchText === '' || !searchText)
      .value();
    setOptions(newOptions);
    setKeyword(searchText);
  };
  const onVisibilityChange = (visibility: boolean) => {
    if (!visibility) {
      onSearch('');
      setKeyword('');
    }
  }

  return (
    <Dropdown onVisibleChange={onVisibilityChange} placement="bottomCenter" overlayStyle={{maxHeight: 300, maxWidth: 300, overflowY: 'auto'}} key={10} overlay={(
      <Menu style={{padding: 10}}>
        <Menu.Item key={'filter-input'} onClickCapture={stopBubblingUp}>
          <Input
            autoFocus={true}
            placeholder="filter tags list"
            onChange={e => onSearch(e.target.value)}
            onClickCapture={stopBubblingUp}
            value={keyword}
          />
        </Menu.Item>
        { options.map(tag => {
          const checked: boolean = !!tileParams.tags && tileParams.tags.split(',').indexOf(tag) > -1;
          return (
            <Menu.Item key={tag} onClickCapture={stopBubblingUp}>
              <Checkbox value={tag} checked={checked} onChange={onTagClick}>{tag}</Checkbox>
            </Menu.Item>
          )
        })}
      </Menu>
    )} trigger={['click']}>
      <Button>
        Tags <DownOutlined />
      </Button>
    </Dropdown>
  );
}