import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Input, List, Spin } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BoardSearchResult } from '../../types/boards.types';
import AppSearchItem from './AppSearchItem';
import { Router, withRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import { AppState } from '../../types/app.types';

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
  position: fixed;
  top: -2px;
  left: 50%;
  width: 100%;
  bottom: 0;
  max-height: 100%;
  overflow-y: auto;
  padding: 50px 10px 10px;
  z-index: 0;
  max-width: 600px;
  transform: translateX(-50%);
  
  //position: absolute;
  //top: 100%;
  background-color: rgba(255, 255, 255, .9);
  //padding: 10px;
  //width: 100%;
  //z-index: 1;
  //border-top: 1px solid #eee;
  //max-height: calc(100vh - 50px);
  //overflow-y: auto;
`;
const InputStyled = styled(Input)`
  border: 0;
  border-radius: 3px;
  z-index: 1;
`;

interface AppSearchProps {
  router: Router;
  searchFetcher(keyword: string): Promise<{ results: Array<BoardSearchResult>; total_count: number; }>;
}
interface AppSearchState {
  searching: boolean;
  keyword: string;
  results?: Array<BoardSearchResult>;
  count: number;
}

class AppSearch extends React.PureComponent<AppSearchProps, AppSearchState> {
  constructor(props: AppSearchProps) {
    super(props);

    this.state = {
      searching: false,
      keyword: '',
      results: undefined,
      count: 0
    }
  }

  onClickContainer = (e: SyntheticEvent) => {
    try {
      if ((e.target as HTMLDivElement).className.indexOf('search-container') > -1) {
        this.onReset();
      }
    } catch (e) {}
  }

  onReset = async () => {
    this.setState({
      keyword: '',
      searching: false,
      results: undefined,
      count: 0
    });
    const urlPath: string = this.props.router.asPath.split('?')[0];
    const urlParams: URLSearchParams = new URLSearchParams(this.props.router.asPath.split('?')[1]);
    urlParams.delete('search');

    await this.props.router.push(
      this.props.router.pathname,
      `${urlPath}?${urlParams.toString()}`,
      { shallow: false }
    );
  }

  onSearch = async () => {
    this.setState({
      searching: true,
      results: []
    });

    const urlPath: string = this.props.router.asPath.split('?')[0];
    const urlParams: URLSearchParams = new URLSearchParams(this.props.router.asPath.split('?')[1]);
    urlParams.delete('search');
    urlParams.set('search', encodeURIComponent(this.state.keyword));

    await this.props.router.push(
      this.props.router.pathname,
      `${urlPath}?${urlParams.toString()}`,
      { shallow: false }
    );

    const data = await this.props.searchFetcher(this.state.keyword);

    this.setState({
      results: data.results,
      count: data.total_count,
      searching: false
    });
  }

  render() {
    let cssClass: string = 'search-container';
    if (this.state.results) {
      cssClass += ' has-results';
    }

    return (
      <Spin spinning={this.state.searching}>
        <Container className={cssClass} onClick={this.onClickContainer}>
          <InputStyled
            prefix={<SearchOutlined />}
            placeholder={'type to search'}
            allowClear={true}
            onChange={e => this.setState({ keyword: e.target.value })}
            onSubmit={this.onSearch}
            onPressEnter={this.onSearch}
            value={this.state.keyword}
          />
          {this.state.results && this.state.results.length > 0 && (
            <ResultsContainer>
              <h5>Results ({this.state.count})</h5>
              <List
                itemLayout="vertical"
                dataSource={this.state.results}
                renderItem={(item: BoardSearchResult) => (
                  <AppSearchItem item={item} key={item.id} />
                )}
              >
              </List>
            </ResultsContainer>
          )}
        </Container>
      </Spin>
    );
  }
}

const mapStateToProps = (state: { app: AppState; }) => ({
  searchFetcher: state.app.searchFetcher
});

export default connect(mapStateToProps)(
  withRouter(AppSearch)
);
