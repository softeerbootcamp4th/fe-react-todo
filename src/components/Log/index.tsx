function Log() {
    return (
        <div className="w-[350px] h-[600px] py-12 px-10 rounded-3xl shadow-lg flex flex-col items-center gap-10">
            <header className="text-5xl font-bold font-Cafe24Meongi">Log</header>
            <ul className="w-64 flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                    <span className="w-10 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center">
                        수정
                    </span>
                    <p className="max-w-52 truncate">밥먹고학교가고똥싸기</p>
                </li>
                <li className="flex gap-2 items-center">
                    <span className="w-10 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center">
                        삭제
                    </span>
                    <p className="max-w-52 truncate">
                        밥먹고학교가고똥싸ㅁㅇㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴ기
                    </p>
                </li>
                <li className="flex gap-2 items-center">
                    <span className="w-10 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center">
                        등록
                    </span>
                    <p className="max-w-52 truncate">밥먹고학교가고똥싸기</p>
                </li>
            </ul>
        </div>
    );
}

export default Log;
