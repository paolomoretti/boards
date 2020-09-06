import * as React from 'react';
import {lazy, Suspense, SyntheticEvent} from 'react';
import {Input, Spin} from 'antd';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {BoardSearchResult} from '../../types/boards.types';
import {Router, withRouter} from 'next/router';
import {SearchOutlined} from '@ant-design/icons';
import {AppState} from '../../types/app.types';

const AppSearchResults = lazy(() => import('./AppSearchResults'));

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
            <Suspense fallback={<Spin spinning={true} />}>
              <AppSearchResults count={this.state.count} results={this.state.results} />
            </Suspense>
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
