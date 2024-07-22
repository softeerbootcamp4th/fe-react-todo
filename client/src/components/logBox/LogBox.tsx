import React, { useEffect, useState, useRef } from 'react';
import LogItem from '../logItem/LogItem';
import Badge from '../badge/Badge';
import { Space } from '../../style/style';
import { getAllLogEntries } from '../../apis/log';
import { ILog } from '../../apis/log';
import { ILogBoxProps } from './type';
import { deleteAllLog } from '../../apis/log';
import { FaTrashCan } from 'react-icons/fa6';
import * as Styled from './style';

const LogBox: React.FC<ILogBoxProps> = ({ isLogShow, todoItemDatas }) => {
  const [logDatas, setLogDatas] = useState<ILog[]>([]);
  const logListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    getAllLogEntries().then(response => setLogDatas(response));
  }, [todoItemDatas]);

  useEffect(() => {
    if (logListRef.current) {
      logListRef.current.scrollTop = 0;
    }
  }, [logDatas]);

  const handleTrashCan = () => {
    isLogShow &&
      deleteAllLog().then(() => {
        setLogDatas([]);
      });
  };

  return (
    <Styled.LogBox isLogShow={isLogShow}>
      <h1 className="title">Log</h1>
      <Space size={36} />
      <ul ref={logListRef} css={{ overflowY: 'auto', height: '300px', scrollbarWidth: 'thin' }}>
        {logDatas.map(log => (
          <LogItem
            key={log.id}
            content={log.content}
            oldContent={log.oldContent}
            type={log.type}
            badge={<Badge type={log.type} />}
          />
        ))}
      </ul>
      <FaTrashCan
        css={{ position: 'absolute', cursor: 'pointer', right: 40, bottom: 100, color: '#aaa' }}
        onClick={handleTrashCan}
        size={32}
      />
    </Styled.LogBox>
  );
};

export default LogBox;
