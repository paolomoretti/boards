import * as React from 'react';
import {ReactNode} from 'react';
import {Article, Highlight} from '../../types/boards.types';
import styled from 'styled-components';
import {BoardTile} from './BoardTile';
import {Quote} from '../shared/Quote';
import {Card, Typography} from 'antd';
import {HighlightText} from '../shared/Highlight';
import {CDNImage} from "../shared/CDNImage";

const { Meta } = Card;
const { Paragraph } = Typography;
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
  highlights?: Highlight;
}

export default function BoardTileArticle({ link, highlights, actions, summary, footer, onChangeSummary, children }: BoardTileArticleProps) {
  onChangeSummary = onChangeSummary || console.log;

  if (highlights) {
    Object.keys(highlights).forEach((item: any) =>
      // @ts-ignore
      link[item] = <HighlightText text={typeof highlights[item] === 'string' ? highlights[item] : highlights[item].join('')} />
    );
  }
  return (
    <BoardTile
      size={'small'}
      cover={
        link.lead_image ? <CDNImage
          alt={link.name}
          src={link.lead_image.url_archived_small}
          width={400}
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
