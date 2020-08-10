import * as React from 'react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Input, List, Spin } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getSearchFetcher } from '../../data/store/selectors';
import { BoardSearchResult } from '../../types/boards.types';
import AppSearchItem from './AppSearchItem';
import { Router } from 'next/router';

const { Search } = Input;

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 10000;
  
  &.has-results {
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .7);
    }
  }
`;
const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  background-color: rgba(255, 255, 255, .9);
  padding: 10px;
  width: 100%;
  z-index: 1;
  border-top: 1px solid #eee;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
`;
const InputStyled = styled(Search)`
  border: 0;
  border-radius: 3px;
`;

export default function AppSearch() {
  const searchFetcher = useSelector(getSearchFetcher);
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Array<BoardSearchResult> | undefined>(undefined);
  const [count, setCount] = useState(0);

  const onSearch = async () => {
    setSearching(true);
    setResults([]);
    const data = await searchFetcher(keyword);
    setResults(data.results);
    setCount(data.total_count);
    setSearching(false);
  }

  const onReset = () => {
    setKeyword('');
    setSearching(false);
    setResults(undefined);
    setCount(0);
  }

  const onClickContainer = (e: SyntheticEvent) => {
    if ((e.target as HTMLDivElement).className.indexOf('search-container') > -1) {
      onReset();
    }
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', onReset);

    return () =>
      Router.events.off('routeChangeStart', onReset)
  });

  let cssClass: string = 'search-container';
  if (results) {
    cssClass += ' has-results';
  }

  return (
    <Spin spinning={searching}>
      <Container className={cssClass} onClick={onClickContainer}>
        <InputStyled
          placeholder={'type to search'}
          onChange={e => setKeyword(e.target.value)}
          loading={searching}
          onSubmit={onSearch}
          onPressEnter={onSearch}
          value={keyword}
        />
        {results && results.length > 0 && (
          <ResultsContainer>
            <h5>Results ({count})</h5>
            <List
              itemLayout="vertical"
              dataSource={results}
              renderItem={(item: BoardSearchResult) => (
                <AppSearchItem item={item} key={item.id} />
              )}
            >
            </List>
          </ResultsContainer>
        )}
      </Container>
    </Spin>
  )
}