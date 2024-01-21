"use client";
import React, { useEffect } from "react";
import styles from "./conversation.module.css";
import Image from "next/image";
import axios from "axios";
const Conversation = ({ conversation, session }) => {
  // console.log(conversation);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m == session.user.id);

    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios.post("/api/conversation", {
          friendId,
          type: "getUser",
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [session.user, conversation]);
  return (
    <div className={styles.conversation}>
      <Image
        className={styles.conversationImg}
        src="/noavatar.png"
        alt="noavatar.png"
        height={40}
        width={40}
      />
      <span className={styles.conversationName}>John doe</span>
    </div>
  );
};

export default Conversation;
