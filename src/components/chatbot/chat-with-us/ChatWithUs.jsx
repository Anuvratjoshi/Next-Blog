import React from "react";
import styles from "./chatwithus.module.css";
import Image from "next/image";
import Link from "next/link";

const ChatWithUs = () => {
  return (
    <Link href="/chat">
      <div className={styles.chatWithUsContainer}>
        <div className={styles.chatIcon}>
          <Image src="/bot.png" height={30} width={30} alt="bot.png" />
        </div>
        <div className={styles.chatText}>Chat with Us</div>
      </div>
    </Link>
  );
};

export default ChatWithUs;
