import * as React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Styles } from '../../styles/vars';

const Wrapper = styled.div`
  button {
    transform: scale(1.3);
  }
`;

export default function AddBoardContentButton({ addContent }: { addContent: Function }) {
  return (
    <Wrapper style={Styles.ContextualAddButton}>
      <Button
        key={'add-content-button'}
        icon={<PlusOutlined />}
        onClick={() => addContent()}
        type="primary"
        size={'large'}
        shape={'circle'}
      />
    </Wrapper>
  )
}
