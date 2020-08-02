import * as React from 'react';
import { Article } from '../../types/boards.types';
import styled from 'styled-components';
import { BoardItem } from './BoardItem';
import { Col, Typography } from 'antd';
import { ImageCanvas } from '../shared/ImageCanvas';

const { Title } = Typography;
const ArticleUrl = styled.a`
  margin: -7px 0 0;
  display: block;
  font-size: .9em;
`

interface BoardItemArticleProps {
  link: Article;
}

export default function BoardItemArticle({ link }: BoardItemArticleProps) {
  return (
    <BoardItem justify={'center'}>
      {link.lead_image && (
        <Col flex={'1'}>
          <ImageCanvas src={link.lead_image.url_archived_small} />
        </Col>
      )}
      <Col flex={'3'}>
        <div>
          <Title level={4} style={{fontSize: 14}} ellipsis={{ rows: 2, expandable: false, suffix: '.' }}>{link.name}</Title>
          <ArticleUrl href={link.url} target={'_blank'}>{link.url_host}</ArticleUrl>
        </div>
      </Col>
    </BoardItem>
  );
}