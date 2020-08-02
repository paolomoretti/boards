import { Board, BoardTile, TileComment } from '../../types/boards.types';
import styled from 'styled-components';
import { SyntheticEvent, useState } from 'react';
import { Avatar, Button, Comment, Form, Input, message, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { getCurrentBoard, getUser } from '../../data/store/selectors';
import { User } from '../../types/app.types';
import { addBoardTileComment } from '../../utils/fetchers/addBoardTileComment';
import { AlignRight } from '../../styles/helpers';
import { addBoardTileCommentReply } from '../../utils/fetchers/addBoardTileCommentReply';

const Container = styled.div`
  margin: 1em 0 0;
`;
const { TextArea } = Input;

interface BoardTileCommentAddProps {
  tile: BoardTile;
  comment?: TileComment;
  reply?: boolean;
  onCreate(comment: TileComment): void;
}
export const BoardTileCommentAdd = ({ tile, reply, comment, onCreate }: BoardTileCommentAddProps) => {

  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const board: Board = useSelector(getCurrentBoard)!;
  const user: User = useSelector(getUser)!;

  const onChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const onCreated = (comment: TileComment) => {
    setLoading(false);
    setCommentText('');
    onCreate(comment);
  };

  const onReplied = (comment: TileComment) => {
    setLoading(false);
    onCreate(comment);
  };

  const onErrorCreating = (err: unknown) => {
    console.error('Error creating comment', err);
    message.error(`Error sending new comment`);
    setLoading(false);
  };

  const onPressEnter = (e: SyntheticEvent) => {
    // @ts-ignore
    if (e.ctrlKey) {
      onSubmit();
    }
  }

  const onSubmit = () => {
    setLoading(true);
    if (reply) {
      addBoardTileCommentReply(board.id, tile.id, comment!.comment_id, comment!.comment_thread_id, commentText)
        .then(onReplied)
        .catch(onErrorCreating)
    } else {
      addBoardTileComment(board.id, tile.id, commentText)
        .then(onCreated)
        .catch(onErrorCreating)
    }
  };

  const CommentEditor = (
    <Form>
        <TextArea
          rows={3}
          onChange={onChange}
          autoFocus={true}
          onPressEnter={onPressEnter}
          disabled={loading}
          value={commentText}
        />
        <AlignRight style={{paddingTop: 10}}>
          <Button htmlType="submit" size={'small'} loading={loading} onClick={onSubmit} type="primary">
            Add {reply ? 'reply' : 'comment'}
          </Button>
        </AlignRight>
    </Form>
  );

  return (
    <Container>
      <Spin spinning={loading}>
        <Comment
          avatar={<Avatar src={user.avatar.small} alt={user.full_name}/>}
          content={CommentEditor}
        />
      </Spin>
    </Container>
  )
};