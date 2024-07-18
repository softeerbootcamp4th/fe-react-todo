import { createContext } from "react";

export const example = [
  {
    type: "수정",
    before: {
      id: 1,
      isDone: true,
      title: "sfdsfsd",
    },
    after: {
      id: 1,
      isDone: true,
      title: "asdfasdfasdfasdf",
    },
  },
  {
    type: "삭제",
    before: {
      id: 2,
      isDone: true,
      title: "sfdsfasdsd",
    },
    after: null,
  },
  {
    type: "추가",
    before: null,
    after: {
      id: 3,
      isDone: true,
      title: "asddfdfdfdffasdfasdfasdf",
    },
  },
  {
    type: "완료",
    before: {
      id: 0,
      isDone: false,
      title: "sfdsfsd",
    },
    after: {
      id: 0,
      isDone: true,
      title: "sfdsfsd",
    },
  },
  {
    type: "완료취소",
    before: {
      id: 10,
      isDone: true,
      title: "sfdsfsd",
    },
    after: {
      id: 10,
      isDone: false,
      title: "sfdsfsd",
    },
  },
];

// {
//     "type": "추가" | "삭제" | "수정",
//     "before" : {
//         "isDone": "ss",
//         "title": "sfdsfsd"
//     } ,
//     "after" : {
//         "isDone": "ss",
//         "title": "sfdsfsd"
//     }
// }

// 추가 : ~~를 추가했습니다.
// 삭제 : ~~를 삭제 했습니다.
// 수정 : ~~를 ~~로 수정했습니다.
// 완료 : ~~를 완료했습니다.
// 완료취소 : ~~의 완료를 취소했습니다.
export const LogStore = createContext(example);
