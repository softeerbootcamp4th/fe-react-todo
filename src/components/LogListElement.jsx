import styles from '../styles/logListElement.module.css'


function LogListElement({ log }) {
    return (
        <>
            <strong className={log.title === '등록' ? styles.register : log.title === '삭제' ? styles.remove : log.title === '수정' ? styles.update : styles.complete}>{log.title}</strong>
            <hr />
            <p className={styles.logBody}>{log.body}</p>
        </>
    );
}

export default LogListElement;