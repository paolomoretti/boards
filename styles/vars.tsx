import { FilePdfOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

export const cardColBreakpoints = {
  default: 4,
  1300: 3,
  1000: 2,
  700: 1
};

export enum Size {
  HEADER_HEIGHT = 50,
  MAX_APP_WIDTH = 1400
}

export enum Colors {
  APP_BG = '#f0f2f5',
  APP_HEADER_BG = 'antiquewhite',
  PRIMARY = '#861d1b',
  SUCCESS = '#52c41a',
  ERROR = '#c00',
  NOTE = '#fef2da'
}

export enum Shadows {
  POP_OUT = '0 5px 6px 0px rgba(0,0,0,.3)',
  HEADER = '0px 10px 5px -7px #f0f2f5'
}

export enum Zindex {
  ADD_BUTTON = 1100,
  HEADER = 1000,
  BOARD_HEADER = 900
}

export type StyledType = 'ContextualAddButton';
export const Styles: Record<StyledType, CSSProperties> = {
  ContextualAddButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: Zindex.ADD_BUTTON
  }
}

export enum FileTypeIcon {
  // @ts-ignore
  "application/pdf" = <FilePdfOutlined />
}
