import { Col, Divider, Row, Tag, Typography } from 'antd';
import { GetBoardTilesParams } from '../../types/boards.types';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardTileParams } from '../../data/store/selectors';
import * as _ from 'lodash';
import { setBoardTilesParams } from '../../data/store/actions';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { initialState } from '../../data/store/reducers';

const { Text, Link } = Typography;
const Separator = styled(Divider)`
  border-color: #ccc;
  margin-right: 12px;
`

export default function BoardCurrentFilter() {
  const dispatch = useDispatch();
  const filterParams: Partial<GetBoardTilesParams> = useSelector(getBoardTileParams);
  const currentFilters = [];

  const removeTag = (tag: string) => {
    const newTagsList: Array<string> = _.chain(filterParams.tags!.split(',')).without(tag).value();
    const newFilterParams: Partial<GetBoardTilesParams> = Object.assign({}, filterParams, {
      tags: newTagsList.join(',')
    });
    dispatch(setBoardTilesParams(newFilterParams));
  }

  const removeFilter = (filter: string) => {
    const newFilterParams: Partial<GetBoardTilesParams> = Object.assign({}, filterParams, {
      filters: _.without(filterParams.filters, filter)
    });
    dispatch(setBoardTilesParams(newFilterParams));
  }

  const clearAll = () => {
    dispatch(setBoardTilesParams(initialState as any));
  }

  const removeKeyword = () => {
    const newFilterParams: Partial<GetBoardTilesParams> = Object.assign({}, filterParams, {
      search_text: ''
    });
    dispatch(setBoardTilesParams(newFilterParams));
  }

  if (filterParams.search_text && filterParams.search_text.length > 0) {
    currentFilters.push(
      <Col key={'search text'}>
        <Text>
          <strong>Keyword: </strong>
          <Tag closable={true} onClose={() => removeKeyword()}>{filterParams.search_text}</Tag>
        </Text>
      </Col>
    )
  }

  if (filterParams.filters && filterParams.filters.length > 0) {
    currentFilters.push(
      <Col key={'filters'}>
        <Text>
          <strong>Filters: </strong>
          {filterParams.filters.map((filter: string) => (
            <Tag key={filter} closable={true} onClose={() => removeFilter(filter)}>{filter.replace(/_/gi, ' ')}</Tag>
          ))}
        </Text>
      </Col>
    )
  }

  if (filterParams.tags && filterParams.tags.length > 0) {
    currentFilters.push(
      <Col key={'tags'}>
        <Text>
          <strong>Tags: </strong>
          {filterParams.tags.split(',').map((tag: string) => (
            <Tag key={tag} closable={true} onClose={() => removeTag(tag)}>{tag}</Tag>
          ))}
        </Text>
      </Col>
    )
  }

  const rowStile: CSSProperties = currentFilters ? {
    padding: 10
  } : {};

  return (
    <Row align={'middle'} justify={'center'} style={rowStile}>
      {currentFilters.map((item: ReactNode, index: number) => (
        index < currentFilters.length - 1 ? (
          <>{item}<Separator type="vertical" /></>
        ) : item
      ))}
      {currentFilters.length > 0 && (
        [<Separator type="vertical" />, <Link onClick={clearAll}>Clear all</Link>]
      )}
    </Row>
  )
}