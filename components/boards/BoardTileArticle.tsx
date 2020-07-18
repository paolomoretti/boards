import * as React from 'react';
import { Article } from '../../types/boards.types';
import styled from 'styled-components';
import Meta from 'antd/lib/card/Meta';
import Paragraph from 'antd/lib/typography/Paragraph';
import { BoardTile } from './BoardTile';
import { ReactNode } from 'react';
import { Image } from '../shared/Image';

const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
`;
const ArticleUrl = styled.a`
  margin: -7px 0 10px;
  display: block;
  font-size: .9em;
`

interface BoardTileArticleProps {
  link: Article;
  actions: any;
  children: ReactNode;
}

export default function BoardTileArticle({ link, actions, children }: BoardTileArticleProps) {
  return (
    <BoardTile
      size={'small'}
      cover={
        link.lead_image ? <Image
          alt={link.name}
          src={link.lead_image.url_archived_small}
        /> : null
      }
      actions={actions}
    >
      <Meta
        title={link.name}
        description={<ArticleUrl href={link.url} target={'_blank'}>{link.url_host}</ArticleUrl>}
      />
      <ParagraphStyled
        ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>{link.description}</ParagraphStyled>
      {children}
    </BoardTile>
  );
}