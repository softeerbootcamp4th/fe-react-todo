import React, { useContext } from "react";
import styled from "styled-components";
import { LogStore } from "../Provider/logContext";

const ActivityLog = () => {
  const { logList, setLogList } = useContext(LogStore);

  return (
    <Container>
      {logList &&
        logList.map((logItem) => {
          const type = logItem.type;
          let content = "";
          switch (type) {
            case "추가":
              content = `${logItem.after.title}이(가) 추가되었습니다`;
              break;
            case "삭제":
              content = `${logItem.before.title}이(가) 삭제되었습니다`;
              break;
            case "수정":
              content = `${logItem.before.title}이(가) ${logItem.after.title}로 수정되었습니다`;
              break;
            case "완료":
              content = `${logItem.before.title}이(가) 완료되었습니다`;
              break;
            case "완료취소":
              content = `${logItem.before.title}이(가) 완료 취소되었습니다`;
              break;
          }
          return <LogItem>✅ {content}</LogItem>;
        })}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 2rem 2rem 1rem;
  position: absolute;
  right: 0;
  top: 50%;
  height: 80%;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  border-radius: 5px;
  transform: translateY(-50%);
`;

const LogItem = styled.div``;

export default ActivityLog;
