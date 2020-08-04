import * as React from 'react';
import { useState } from 'react';
import * as _ from 'lodash';
import { Button, Form, Input, message, Row, Spin, Tag, Typography } from 'antd';
import { PlusOutlined, TagsOutlined } from '@ant-design/icons';
import { AlignCenter, ButtonHolder } from '../../styles/helpers';
import { Store } from 'rc-field-form/lib/interface';
import styled from 'styled-components';
import Dropzone from 'react-dropzone-uploader';
import { FilePreview } from '../shared/FilePreview';
import { uploadBoardTileFile } from '../../utils/fetchers/uploadBoardTileFile';
import { IMeta } from 'react-dropzone-uploader/dist/Dropzone';
import { Colors } from '../../styles/vars';
import AddTag from '../shared/AddTag';
import { BoardTile } from '../../types/boards.types';
import { Constants } from '../../data/constants';

const { TextArea } = Input;
const { Paragraph } = Typography;
const ExtrasParagraph = styled(Paragraph)`
  padding: 3px 0 0;
  a {
    margin-left: .7em;
  }
`;
const ContentTypeSelector = styled(Row)`
  margin-bottom: 20px;
`;
const DropBoxContainer = styled.div`
  min-height: 150px;
  background-color: ${Colors.APP_BG};
  border: 2px solid transparent;
  position: relative;
  
  &.active {
    border-color: ${Colors.PRIMARY};
  }
  
  label {
    text-align: center;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: 100%;
    
    span {
      display: block;
    }
  }
`;
const ClickableTag = styled(Tag)`
  cursor: pointer;
  margin-bottom: 4px;
`;

interface ModalAddBoardContentProps {
  boardId: number;
  boardTags?: Array<string>;
  onClose(): void;
  onAdd?(content: string | BoardTile): void;
  onUploaded?(tile: BoardTile): void;
}

const UploadTextForm = ({ onAdd, onClose }: ModalAddBoardContentProps) => {
  // const [tags, setTags] = useState([]);

  const onAddContent = (values: Store) => {
    if (values.content && values.content !== '') {
      onAdd!(values.content);
    } else {
      message.error('Content is mandatory');
    }
  }

  return (
    <Form onFinish={onAddContent}>
      <Form.Item name="content" style={{margin: 0}}>
        <TextArea autoSize={{ minRows: 3, maxRows: 8 }} autoFocus={true} />
      </Form.Item>
      <ExtrasParagraph style={{textAlign: 'right', marginTop: 0}}>
        <a>
          <TagsOutlined /> Add tags
        </a>
      </ExtrasParagraph>

      <ButtonHolder>
        <Button type={'dashed'} onClick={onClose}>Cancel</Button>
        <Button type={'primary'} htmlType="submit">Add</Button>
      </ButtonHolder>
    </Form>
  );
}
const UploadFileForm = ({ boardId, onUploaded, onClose, boardTags }: ModalAddBoardContentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<IMeta & { file: File; } >>([]);
  const [tags, setTags] = useState<Array<string>>([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const onAddTag = (tag: string) => {
    setTags(_.uniq([tag, ...tags]));
  }
  const removeTag = (tag: string) => {
    setTags(_.without(tags, tag));
  }
  const onUploadProgress = (progress: any, fileId: any) => {
    setFiles(files.map(f => {
      if (f.id === fileId) {
        return { ...f, progress: Math.ceil(100 * (progress.loaded / progress.total))}
      } else {
        return f;
      }
    }));
  };
  const onRemoveFile = (file: IMeta) => {
    setFiles(_.reject(files, f => f.id === file.id));
  }
  const handleChangeStatus = ({ meta, file }: { meta: any; file: any; }, status: string) => {
    switch (status) {
      case 'done': // Added file from user input
        setFiles([{...meta, file}, ...files]);
        break;
    }
  }

  const onAddContent = () => {
    setLoading(true);
    if (files && files.length > 0) {
      // Upload file
      files.forEach(file => {
        const formData: FormData = new FormData();
        formData.append('file', file.file, file.name);
        if (title) {
          formData.append('title', title);
        }
        if (description) {
          formData.append('summary', description);
        }
        if (tags && tags.length > 0) {
          formData.append('tags_str', JSON.stringify(tags));
        }
        uploadBoardTileFile(boardId, formData, onUploadProgress, file.id)
          .then((tile: BoardTile) => {
            setLoading(false);
            onUploaded!(tile);
            return tile;
          })
          .catch((err: any) => {
            message.error(err);
            setLoading(false);
          })
      });
      return;
    }
  }

  return (
    <Spin spinning={loading}>
      <Form onFinish={onAddContent}>
        {files && files.length > 0 && (
          <div>
            <h4>Attachments ({files.length})</h4>
            <Form.Item name="title" label={'Title'} labelCol={{ span: 7 }}>
              <Input onChange={e => setTitle(e.target.value)} value={title} />
            </Form.Item>
            <Form.Item name="description" label={'Description'} labelCol={{ span: 7 }}>
              <TextArea autoSize={{ minRows: 2, maxRows: 4 }} value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item name="tags" label={'Tags'} labelCol={{ span: 7 }}>
              {tags.map(tag => (
                <ClickableTag closable={true} onClose={() => removeTag(tag)} key={tag}>{tag}</ClickableTag>
              ))}
              <AddTag onAddTag={onAddTag} options={(boardTags || []).map(t => ({ value: t}))} />
            </Form.Item>

            {files.map(f => (
              <FilePreview file={f} onRemove={onRemoveFile}/>
            ))}
          </div>
        )}
        <Dropzone
          onChangeStatus={handleChangeStatus}
          accept={Constants.BOARD_FILE_ACCEPTED_TYPES}
          multiple={true}
          PreviewComponent={() => null}
          InputComponent={props => (
            <DropBoxContainer className={props.extra.active ? 'active' : ''}>
              <label htmlFor="upload-input">
                <Button shape={'circle'} size={'large'} icon={<PlusOutlined />} disabled={!props.extra.active} />
                <span>{props.content}</span>
              </label>
              <input
                style={{ display: 'none' }}
                id={'upload-input'}
                type="file"
                accept={props.accept}
                multiple
                onChange={e => {
                  // @ts-ignore
                  const chosenFiles: File[] = props.getFilesFromEvent(e);
                  props.onFiles(chosenFiles);
                }}
              />
            </DropBoxContainer>
          )}
          inputContent={'Drop files here or click to add'}
        />
        <ButtonHolder>
          <Button type={'dashed'} onClick={onClose!}>Cancel</Button>
          <Button type={'primary'} htmlType="submit">Add</Button>
        </ButtonHolder>
      </Form>
    </Spin>
  )
}

export const ModalAddBoardContent = ({ boardId, onClose, onAdd }: ModalAddBoardContentProps) => {
  const [uploadType, setUploadType] = useState<'text' | 'file'>('text');

  const onUploaded = (tile: BoardTile) => {
    if (onAdd) {
      onAdd(tile);
    }
    onClose();
  }

  return (
    <div>
      <ContentTypeSelector align={'middle'} justify={'space-between'}>
        <Button
          type={uploadType === 'text' ? 'primary' : undefined}
          ghost={uploadType === 'text'}
          onClick={() => setUploadType('text')}
        >
          Add text and links
        </Button>
        <AlignCenter>- or -</AlignCenter>
        <Button
          type={uploadType === 'file' ? 'primary' : undefined}
          ghost={uploadType === 'file'}
          onClick={() => setUploadType('file')}
        >
          Upload file/s
        </Button>
      </ContentTypeSelector>

      {uploadType === 'text' ? (
        <UploadTextForm boardId={boardId} onClose={onClose} onAdd={onAdd} />
      ) : (
        <UploadFileForm boardId={boardId} onClose={onClose} onUploaded={onUploaded} />
      )}
    </div>
  )
}