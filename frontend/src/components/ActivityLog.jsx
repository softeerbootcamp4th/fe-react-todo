import React from "react";
import styled from "styled-components";
import { postLogList } from "../api/api";
import useLogContext from "../hooks/useLogList";

const ActivityLog = () => {
  const { logList, resetLogList } = useLogContext();

  const onDeleteHandler = () => {
    const newLogList = resetLogList();

    postLogList(newLogList);
  };

  const getContent = (logItem, type) => {
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
      default:
        content = "error";
        break;
    }
    return content;
  };

  return (
    <>
      <Container>
        {logList &&
          logList.map((logItem) => {
            const type = logItem.type;
            const content = getContent(logItem, type);
            return <LogItem key={logItem.id}>✅ {content}</LogItem>;
          })}
      </Container>
      <DeleteAllButton onClick={onDeleteHandler}>
        로그 전체 삭제
      </DeleteAllButton>
    </>
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

const DeleteAllButton = styled.button`
  position: absolute;
  right: 5rem;
  bottom: 5%;
`;

export default ActivityLog;
