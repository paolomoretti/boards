import { Tooltip } from 'antd';
import * as React from 'react';
import * as _ from 'lodash';
import { TooltipProps } from 'antd/lib/tooltip';
import { isMobile } from '../../utils/isMobile';

export function HelpTooltip(props: TooltipProps & any) {
  const tooltipProps: TooltipProps = _.omit(props, 'children') as TooltipProps;
  if (isMobile()) {
    return props.children;
  }

  return (
    <Tooltip mouseEnterDelay={1} {...tooltipProps}>
      {props.children}
    </Tooltip>
  )
}