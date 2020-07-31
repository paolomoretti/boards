import * as React from 'react';
import { Article } from '../../types/boards.types';
import styled from 'styled-components';
import Meta from 'antd/lib/card/Meta';
import Paragraph from 'antd/lib/typography/Paragraph';
import { BoardTile } from './BoardTile';
import { ReactNode } from 'react';
import { Image } from '../shared/Image';
import { Quote } from '../shared/Quote';

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
  summary?: string;
  onChangeSummary?(newSummary: string): void;
  children: ReactNode;
  footer?: ReactNode;
}

export default function BoardTileArticle({ link, actions, summary, footer, onChangeSummary, children }: BoardTileArticleProps) {
  onChangeSummary = onChangeSummary || console.log;
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
      footer={footer}
    >
      <Meta
        title={link.name}
        description={<ArticleUrl href={link.url} target={'_blank'}>{link.url_host}</ArticleUrl>}
      />
      {summary && (
        <Quote editable={{ onChange: onChangeSummary }} text={summary} />
      )}
      <ParagraphStyled
        ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>{link.description}</ParagraphStyled>
      {children}
    </BoardTile>
  );
}