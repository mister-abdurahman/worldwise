import React from "react";
import styles from "./Message.module.css";

export default function Message({ message }: any) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}
