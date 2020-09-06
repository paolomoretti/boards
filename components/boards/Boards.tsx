import AddBoardButton from "./AddBoardButton";
import {Board} from "../../types/boards.types";
import Link from "next/link";
import BoardCard from "./BoardCard";
import * as React from "react";
import styled from "styled-components";

const BoardsContainer = styled.div`
  padding: 20px 10px;
  
  .board-card-item {
    width: 100%;
    display: inline-block;
    padding: 0 10px 20px;
    box-sizing: border-box;
    
    @media only screen and (min-width: 650px) {
      width: 50%;
    }
    @media only screen and (min-width: 950px) {
      width: 33.3%;
    }
    @media only screen and (min-width: 1250px) {
      width: 25%;
    }
  }
`;

export default function Boards({ boards }: { boards: Array<Board> | undefined; }) {
  if (!boards || !Array.isArray(boards)) {
    return null;
  }
  return (
    <BoardsContainer>
      <AddBoardButton />
      {boards.map((board: Board) =>
        <Link key={board.id} href={'/boards/[id]'} as={`/boards/${board.id}`}>
          <div className={'board-card-item'}>
            <BoardCard board={board}/>
          </div>
        </Link>
      )}
    </BoardsContainer>
  )
}
