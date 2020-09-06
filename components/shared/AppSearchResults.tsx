import {List} from "antd";
import {BoardSearchResult} from "../../types/boards.types";
import AppSearchItem from "./AppSearchItem";
import * as React from "react";
import styled from "styled-components";

const ResultsContainer = styled.div`
  position: fixed;
  top: -2px;
  left: 50%;
  width: 100%;
  bottom: 0;
  max-height: 100%;
  overflow-y: auto;
  padding: 50px 10px 10px;
  z-index: 0;
  max-width: 600px;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, .9);
`;

interface AppSearchResultsProps {
  count: number;
  results: Array<BoardSearchResult>;
}
export default function AppSearchResults({ count, results }: AppSearchResultsProps) {
  return (
    <ResultsContainer>
      <h5>Results ({count})</h5>
      <List
        itemLayout="vertical"
        dataSource={results}
        renderItem={(item: BoardSearchResult) => (
          <AppSearchItem item={item} key={item.id} />
        )}
      >
      </List>
    </ResultsContainer>
  )
}
