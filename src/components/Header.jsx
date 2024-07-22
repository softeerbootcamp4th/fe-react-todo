import React from "react";
import styles from "../styles/header.module.css"

function Header() {
    return (
        <header className={styles.header}><span className={styles.title}>My Todo App</span></header>
    );
}

export default Header;