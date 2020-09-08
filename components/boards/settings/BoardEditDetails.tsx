import {Board, BoardAvatarObj} from "../../../types/boards.types";
import {Form, Input} from "antd";
import * as React from "react";
import {Image} from "../../shared/Image";
import {LineLoading} from "../../shared/LineLoading";

const { TextArea } = Input;

interface Props {
  board: Board;
}

export function BoardEditDetails({ board }: Props) {
  if (!board) {
    return null;
  }

  const avatar: BoardAvatarObj = board.avatar as BoardAvatarObj;
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{span: 16 }}
    >
      <LineLoading loading={true}>
        <Form.Item
          label={'Name'}
          name="name"
          rules={[
            { required: true, message: 'Name is mandatory' }
          ]}
        >
          <Input
            name={'name'}
            defaultValue={board.name}
            placeholder={'Board name'}
            autoFocus={true}
            minLength={40}
          />
        </Form.Item>
        <Form.Item label={'Description'} name="description">
          <TextArea
            name={'description'}
            defaultValue={board.description}
            placeholder={'Board description'}
          />
        </Form.Item>
        <Form.Item label={'Avatar'} name="avatar">
          <Image src={avatar.medium} />
        </Form.Item>
      </LineLoading>
    </Form>
  )
}
