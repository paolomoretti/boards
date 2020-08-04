import * as React from 'react';
import { FileType } from '../../types/boards.types';
import { getFileType } from '../../utils/data/getFileType';
import { FileUnknownOutlined, FileWordOutlined, FileImageOutlined, FileZipOutlined, FilePdfOutlined, PlaySquareOutlined, FilePptOutlined, FileExcelOutlined } from '@ant-design/icons';

export const FileIcon = ({ fileName }: { fileName: string; }) => {
  const fileType: FileType = getFileType(fileName);

  switch (fileType) {
    case 'doc':
      return <FileWordOutlined />;
    case 'image':
      return <FileImageOutlined />;
    case 'pdf':
      return <FilePdfOutlined />;
    case 'ppt':
      return <FilePptOutlined />;
    case 'video':
      return <PlaySquareOutlined />;
    case 'xls':
      return <FileExcelOutlined />;
    case 'zip':
      return <FileZipOutlined />;

    default:
      return <FileUnknownOutlined />;
  }
}
