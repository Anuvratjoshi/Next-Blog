import Image from "next/image";
import React from "react";
import styles from "./message.module.css";
const Message = ({ own }) => {
  return (
    <div className={`${styles.message} ${own ? styles.own : ""}`}>
      <div className={styles.messageTop}>
        <Image
          className={styles.messageImg}
          alt={own ? "noavatar.png" : "bot.png"}
          height={32}
          width={32}
          src={own ? "/noavatar.png" : "/bot.png"}
        />
        <p className={styles.messageText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
        </p>
      </div>
      <div className={styles.messageBottom}>1 hour ago</div>
    </div>
  );
};

export default Message;
