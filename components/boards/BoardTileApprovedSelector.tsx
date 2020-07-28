import * as React from 'react';
import { CSSProperties } from 'react';
import * as _ from 'lodash';
import { Button, Tooltip } from 'antd';
import { GetBoardTilesParams } from '../../types/boards.types';
import { StarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams } from '../../data/store/selectors';
import { setBoardTilesParams } from '../../data/store/actions';
import { Colors } from '../../styles/vars';

export default function BoardTileApprovedSelector() {
  const dispatch = useDispatch();
  const tileParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const filters: Array<string> = _.without(tileParams.filters || [], 'approved_only', 'unapproved_only');
  const approved: boolean | undefined = (tileParams.filters || []).indexOf('approved_only') > -1 ?
    true :
    (tileParams.filters || []).indexOf('unapproved_only') > -1 ? false : undefined;
  console.log(`approved`, approved);
  const iconStyle: CSSProperties = {};

  switch (approved) {
    case true:
      iconStyle.color = Colors.PRIMARY;
      iconStyle.borderColor = Colors.PRIMARY;
      break;
    case false:
      iconStyle.color = Colors.ERROR;
      iconStyle.borderColor = Colors.ERROR;
      break;
  }

  const onChangeStarred = () => {
    if (approved === undefined) {
      filters.push('approved_only');
    } else if (approved) {
      filters.push('unapproved_only');
    }
    dispatch(setBoardTilesParams({
      ...tileParams,
      filters
    }));
  }

  return (
    <Tooltip title="Click to filter by approved/unapproved" mouseEnterDelay={1}>
      <Button style={iconStyle} shape="circle" onClick={onChangeStarred}>
        <StarOutlined style={iconStyle} />
      </Button>
    </Tooltip>
  );
}