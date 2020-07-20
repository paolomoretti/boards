import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { ButtonHolder } from '../../styles/helpers';
import { updateBoardAvatar } from '../../utils/fetchers/updateBoardAvatar';
import { Image } from '../shared/Image';

interface ModalChangeBoardCoverProps {
  onClose(): void;
  boardId: number;
}

export const ModalChangeBoardCover = ({ onClose, boardId }: ModalChangeBoardCoverProps) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const onSetCover = async () => {
    const formData = new FormData();
    formData.append(
      "file",
      file!,
      // @ts-ignore
      file!.name
    );
    formData.append('image_height', '500');
    formData.append('image_width', '500');

    await updateBoardAvatar(boardId, formData)
      .then(res => {
        console.log('RESPONSE', res);
      })
      .catch(console.error)
  }

  const onFileChange = (e: SyntheticEvent) => {
    // @ts-ignore
    const file: File = e.target.files[0];
    setFile(file);
    const fileUrl: string = URL.createObjectURL(file);
    setFilePreview(fileUrl);
  }

  return (
    <Spin spinning={false}>
      <Form onFinish={onSetCover} encType={'multipart/form-data'}>
        <Form.Item name="name">
          <Input onChange={onFileChange} type={'file'} name={'cover'} placeholder={'Pick image from your disk'} />
        </Form.Item>
        {filePreview && (
          <div style={{marginBottom: 20}}>
            <Image width={'100%'} src={filePreview} />
          </div>
        )}
        <ButtonHolder>
          <Button type={'dashed'} onClick={onClose}>Cancel</Button>
          <Button type={'primary'} htmlType="submit">Set cover</Button>
        </ButtonHolder>
      </Form>
    </Spin>
  )
}