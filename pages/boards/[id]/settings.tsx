import * as React from 'react';
import {useEffect, useState} from 'react';
import {Affix, Divider, Col, Row, Spin} from 'antd';
import LoggedPage from '../../../components/layouts/LoggedPage';
import {Size, Zindex} from "../../../styles/vars";
import {BoardHeader} from "../../../components/boards/BoardHeader";
import {Board} from "../../../types/boards.types";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentBoard} from "../../../data/store/selectors";
import styled from "styled-components";
import {getBoard} from "../../../utils/fetchers/getBoard";
import {setCurrentBoard} from "../../../data/store/actions";
import {useRouter} from "next/router";
import {BoardEditDetails} from "../../../components/boards/settings/BoardEditDetails";

const BoardHeaderContainer = styled(Affix)`
  z-index: ${Zindex.BOARD_HEADER};
`;
const SettingsBody = styled.div`
  padding: 0 ${Size.GUTTER}px ${Size.GUTTER}px;
`;

export default function BoardSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query as { id: string; };
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(false);
  const currentBoard: Board | undefined = useSelector(getCurrentBoard);

  useEffect(() => {
    if (!board && currentBoard) {
      setBoard(currentBoard);
    }
    if (!board && !currentBoard && !loading) {
      // Load current board
      setLoading(true);
      getBoard(parseInt(id)).then((b: Board) => {
        setLoading(false);
        setBoard(b);
        dispatch(setCurrentBoard(b));
      });
    }
  });

  return (
    <LoggedPage>
      <Spin spinning={!board || loading}>
        {!board ? null : (
          <BoardHeaderContainer offsetTop={Size.HEADER_HEIGHT}>
            <BoardHeader board={board!} settings={true} />
          </BoardHeaderContainer>
        )}
        <SettingsBody>
          <Divider orientation="left">General</Divider>
          <Row>
            <Col>
              <BoardEditDetails board={board} />
            </Col>
          </Row>

        </SettingsBody>
      </Spin>
    </LoggedPage>
  );
}
