import { useState, useContext } from "react";
import { logContext } from "../context/root";
import styles from '../styles/logList.module.css';
import axios from "axios";
import LogListElement from './LogListElement'

function LogList() {
    const [isClickLogButton, setIsClickLogButton] = useState(false);
    const [logArr, setLogArr] = useContext(logContext);

    const showLogModal = async () => {
        try {
            const response = await axios.get('http://localhost:5000/logs');
            const reversedData = response.data.reverse();
            setLogArr(reversedData);
            setIsClickLogButton(true);
        } catch (error) {
            console.log("데이터가 제대로 안받아짐", error);
        }
    }

    const closeLogModal = () => {
        setIsClickLogButton(false);
    }

    return (
        <>
            {!isClickLogButton ? <button onClick={showLogModal} className={styles.logButton}>Log</button> : <div className={styles.container}>
                {logArr.map((log, index) => (
                    <div key={index} className={styles.logListElement}>
                        <LogListElement
                            log={log}
                            index={index}
                        />
                    </div>
                ))}
                <div className={styles.leftWindow} onClick={closeLogModal}></div>
            </div>
            }
        </>
    );
}

export default LogList;