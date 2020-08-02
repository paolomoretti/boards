import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { ButtonHolder } from '../../styles/helpers';
import { updateBoardAvatar } from '../../utils/fetchers/updateBoardAvatar';
import { Image } from '../shared/Image';
import { formatSize } from '../../utils/data/formatSize';

interface ModalChangeBoardCoverProps {
  onClose(filePreviewUrl?: string, uploadPromise?: Promise<void | { status?: 'ok', errors?: Array<string>; }>): void;
  boardId: number;
}

export const ModalChangeBoardCover = ({ onClose, boardId }: ModalChangeBoardCoverProps) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const onSetCover = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "file",
      file!,
      // @ts-ignore
      file!.name
    );
    formData.append('image_height', '500');
    formData.append('image_width', '500');

    const $upload = updateBoardAvatar(boardId, formData)
      .catch(err => {
        message.error(err);
        setLoading(false);
      });

    if (onClose) {
      onClose(filePreview!, $upload);
    }
  }

  const onCancel = () => onClose();

  const onFileChange = (e: SyntheticEvent) => {
    // @ts-ignore
    const file: File = e.target.files[0];
    setFile(file);
    const fileUrl: string = URL.createObjectURL(file);
    setFilePreview(fileUrl);
  }

  return (
    <Spin spinning={loading}>
      <Form onFinish={onSetCover} encType={'multipart/form-data'}>
        <Form.Item name="name">
          <Input onChange={onFileChange} type={'file'} name={'cover'} placeholder={'Pick image from your disk'} />
        </Form.Item>
        {filePreview && (
          <div style={{marginBottom: 10}}>
            <Image width={'100%'} src={filePreview} />
          </div>
        )}
        {file && (
          <p>{file!.name} ({file.type} / {formatSize(file.size)})</p>
        )}
        <ButtonHolder>
          <Button type={'dashed'} onClick={onCancel}>Cancel</Button>
          <Button type={'primary'} htmlType="submit">Set cover</Button>
        </ButtonHolder>
      </Form>
    </Spin>
  )
}