import { BoardTile } from '../../types/boards.types';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, message } from 'antd';
import { voteTile } from '../../utils/fetchers/voteTile';
import { useDispatch } from 'react-redux';
import { updateCurrentBoardTile } from '../../data/store/actions';
import { CSSProperties } from 'react';
import { Colors } from '../../styles/vars';

const Container = styled.div`
  padding: 0 0 0 5px;
  margin: -4px 0;
  white-space: nowrap;
  
  > * {
    display: inline-block;
    
    &:not(:last-of-type) {
      margin-right: .4em;
    }
    span {
      margin-right: -0.7em;
      font-size: .9em;
    }
  }
`;

export const BoardTileFeedback = ({ tile, boardId }: { tile: BoardTile; boardId: number; }) => {
  const dispatch = useDispatch();
  const { downvoted, downvotes, upvoted, upvotes } = tile;
  const downvoteStyle: CSSProperties = {
    color: downvoted ? Colors.PRIMARY : 'inherit'
  }
  const upvoteStyle: CSSProperties = {
    color: upvoted ? Colors.SUCCESS : 'inherit'
  }

  const vote = (dir: number) => {
    voteTile(dir, tile.id, boardId)
      .then(tile => dispatch(updateCurrentBoardTile(tile)))
      .catch(err => message.error(`Error recording vote`, err));

    if (dir > 0) {
      tile.upvotes++;
      tile.upvoted = true;
      if (downvoted) {
        tile.downvotes--;
      }
    } else if (dir < 0) {
      tile.downvotes++;
      tile.downvoted = true;
      if (upvoted) {
        tile.upvotes--;
      }
    } else {
      // Removing
      if (downvoted) tile.downvotes--;
      if (upvoted) tile.upvotes--;
    }
    dispatch(updateCurrentBoardTile(tile));
  }

  return (
    <Container>
      <div>
        <span>{upvotes}</span>
        <Button type="text" icon={<LikeOutlined style={upvoteStyle} />} onClick={() => vote(upvoted ? 0 : 1)} />
      </div>
      <div>
        <span>{downvotes}</span>
        <Button type="text" icon={<DislikeOutlined style={downvoteStyle} onClick={() => vote(downvoted ? 0 : -1)} />} />
      </div>
    </Container>
  )
};