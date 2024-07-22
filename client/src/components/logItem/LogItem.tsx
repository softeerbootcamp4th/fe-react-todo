import React from 'react';
import { logItemStyle } from './style';
import { ILogItemProps } from './type';
import { BadgeType } from '../badge/type';

const LogItem: React.FC<ILogItemProps> = ({ content, oldContent, type, badge }) => {
  return (
    <li css={logItemStyle}>
      {type === BadgeType.EDIT ? (
        <div css={{ marginRight: 14, wordBreak: 'break-all' }}>
          <span css={{ textDecoration: 'line-through' }}>{oldContent}</span> → <span>{content}</span>
        </div>
      ) : (
        content
      )}
      {badge}
    </li>
  );
};

export default LogItem;
