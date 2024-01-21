import React from "react";
import styles from "./chatOnline.module.css";
import Image from "next/image";
const ChatOnline = () => {
  return (
    <div className={styles.chatOnline}>
      <div className={styles.chatOnlineFriend}>
        <div className={styles.chatOnlineImgContainer}>
          <Image
            src="https://images.pexels.com/photos/19818448/pexels-photo-19818448/free-photo-of-a-couple-sitting-on-a-couch-in-a-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="friend.png"
            height={40}
            width={40}
            className={styles.chatOnlineImg}
          />
          <div className={styles.chatOnlineBadge}></div>
        </div>
        <span className={styles.chatOnlineName}>John doe</span>
      </div>
    </div>
  );
};

export default ChatOnline;
