import { Card, Progress, Typography } from 'antd';
import { formatSize } from '../../utils/data/formatSize';
import { AlignRight } from '../../styles/helpers';
import * as React from 'react';
import { IMeta } from 'react-dropzone-uploader/dist/Dropzone';
import styled from 'styled-components';
import { ImageCanvas } from './ImageCanvas';

const { Link } = Typography;

const Container = styled(Card)`
  margin-bottom: 20px;
`;

interface FilePreviewProps {
  file: IMeta & { progress?: number; };
  onRemove(file: IMeta & { progress?: number; }): void;
}

export const FilePreview = (props: FilePreviewProps) => {
  const { file, onRemove } = props;
  return (
    <Container
      size={'small'}
      title={file.name}
      cover={file.progress ? null : <ImageCanvas height={200} src={file.previewUrl!} />}
      extra={<span>{file.type} / {formatSize(file.size)}</span>}
    >
      {file.progress ? (
        <div style={{padding: 20}}>
          <Progress percent={file.progress} size="small" status={file.progress < 100 ? 'active' : undefined} />
        </div>
      ) : (
        <AlignRight>
          <Link type={'danger'} onClick={_ => onRemove(file)}>Remove</Link>
        </AlignRight>
      )}
    </Container>
  )
}
