"use client";
import React, { useEffect, useState } from "react";
import styles from "./messenger.module.css";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chat-online/ChatOnline";
import axios from "axios";
const Messenger = ({ session }) => {
  // console.log(session);
  const [conversations, setConversation] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/api/conversation/${session.user.id}`);
        setConversation(res.data.conversation);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [session.user.id]);
  return (
    <div className={styles.container}>
      <div className={styles.chatMenu}>
        <div className={styles.chatMenuWrapper}>
          <input
            placeholder="Search for authors"
            className={styles.chatMenuInput}
          />
          {conversations.map((c) => (
            <Conversation conversation={c} session={session} />
          ))}
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxWrapper}>
          <div className={styles.chatBoxTop}>
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
          </div>
          <div className={styles.chatBoxBottom}>
            <textarea
              className={styles.chatMessageInput}
              placeholder="Write something..."
            ></textarea>
            <button className={styles.chatSubmitButton}>Send</button>
          </div>
        </div>
      </div>
      <div className={styles.chatOnline}>
        <div className={styles.chatOnlineWrapper}>
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
