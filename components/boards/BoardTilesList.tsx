import * as React from 'react';
import { Board, BoardTile } from '../../types/boards.types';
import styled from 'styled-components';
import BoardTileCard from './BoardTileCard';
import Masonry from 'react-masonry-css';
import { cardColBreakpoints } from '../../styles/vars';
import * as _ from 'lodash';
import { Empty } from 'antd';
import { connect } from 'react-redux';
import {updateCurrentBoardTiles} from "../../data/store/actions";
import {Action} from "redux";

const MasonryContainer = styled(Masonry)`
  padding: 10px;
  display: flex;
  width: auto;
    
  .my-masonry-grid_column {
    background-clip: padding-box;
  }
`;

interface BoardTilesListProps {
  tiles: Array<BoardTile>;
  board: Board;
  onLoadMore(): void;
  dispatch(action: Action): void;
}

class BoardTilesList extends React.Component<BoardTilesListProps> {
  onScroll = () => {
    const threshold = window.innerHeight * .4;
    if (this.props.onLoadMore && document.body.scrollHeight - window.scrollY - window.innerHeight < threshold) {
      this.props.onLoadMore();
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    this.props.dispatch(updateCurrentBoardTiles([]));
  }

  shouldComponentUpdate(nextProps: Readonly<BoardTilesListProps>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return _.map(nextProps.tiles, 'id').join(',') !== _.map(this.props.tiles, 'id').join(',');
  }

  render() {
    if (!this.props.tiles) {
      return null;
    }
    if (this.props.tiles.length === 0) {
      return <Empty />;
    }
    return (
      <MasonryContainer
        breakpointCols={cardColBreakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {this.props.tiles.map((tile: BoardTile, index: number) => (
          <BoardTileCard
            key={index}
            boardId={this.props.board.id}
            tile={tile}
          />
        ))}
      </MasonryContainer>
    );
  }
}

export default connect()(BoardTilesList);
