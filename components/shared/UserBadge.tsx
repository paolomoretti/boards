import * as React from "react";
import {User} from "../../types/app.types";
import { Avatar, Tooltip } from 'antd';
import {AvatarProps} from "antd/lib/avatar";
import styled from "styled-components";

interface UserBadgeProps extends AvatarProps {
  user: User;
}
const Container = styled.span`
  font-size: 1em;
  color: initial;
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 0 !important;
`;
export function UserBadge(props: UserBadgeProps) {
  const { user } = props;
  return (
    <Container>
      <Tooltip title={user.full_name}>
        <StyledAvatar {...props} src={user.avatar.small} />
      </Tooltip>
    </Container>
  )
}
