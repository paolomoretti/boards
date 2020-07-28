import { FilePdfOutlined } from '@ant-design/icons';

export const cardColBreakpoints = {
  default: 4,
  1300: 3,
  1000: 2,
  700: 1
};

export enum Size {
  HEADER_HEIGHT = 50
}

export enum Colors {
  APP_BG = '#f0f2f5',
  PRIMARY = '#861d1b',
  SUCCESS = '#52c41a',
  ERROR = '#c00',
  NOTE = '#fef2da'
}
export enum FileTypeIcon {
  // @ts-ignore
  "application/pdf" = <FilePdfOutlined />
}
