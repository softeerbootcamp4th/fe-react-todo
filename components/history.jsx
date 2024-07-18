import { clearAllHistory } from "../utils/db";

export default function History({ historyList, setHistoryList }) {

  function calculateDate(oldDate) {
    const oldTime = new Date(oldDate).getTime() / 1000;
    const nowTime = new Date().getTime() / 1000;
    const deltaMinute = (nowTime - oldTime) / 60;
    if (deltaMinute < 1) return "방금 전";
    else if (deltaMinute < 60) return `${Math.floor(deltaMinute)}분 전`;
    else if (deltaMinute < 60 * 24) return `${Math.floor(deltaMinute / 60)}시간 전`;
    return `${Math.floor(deltaMinute / 60 / 24)}일 전`;
  }

  function printAction(history) {
    if (history.type === "delete") {
      return `${history.before} 삭제`;
    }
    else if (history.type === "edit") {
      return `${history.before}(을)를 ${history.after}(으)로 수정`;
    }
    else if (history.type === "add") {
      return `${history.after} 추가`;
    }
  }

  function clearHistory() {
    clearAllHistory();
    setHistoryList([]);
  }

  return (
    <div
      className="flex flex-col p-3 border border-slate-300 bg-slate-50 h-fit w-60 rounded-xl">
      <div className="flex justify-between mb-3">
        <span
          className="text-xl">
          History
        </span>

        <button
          onClick={clearHistory}
          title="히스토리 삭제"
          className="bg-red-700 p-1 rounded-lg hover:bg-red-900 transition ease-out">
          <img className="h-5" src="broom.png" />
        </button>
      </div>

      <div
        className="w-full flex flex-col divide-y list-none">
        {historyList.map((history, index) =>
          <li
            key={index}
            className="text-sm">
            {calculateDate(history.date)}에 {printAction(history)}
          </li>
        )}
      </div>
    </div>
  );
}