"use client";
import React, { useState } from "react";
import OpenAI from "openai";
import styles from "./chat.module.css";
import ReactLoading from "react-loading";
import { noTokenLeft } from "./noToken";
const KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: KEY,
  dangerouslyAllowBrowser: true, //this property set to true means we are allowing the browser to make request to the openAI directly.This is not recommended in production as it exposes our secret key to the public.We should use server side proxy instead.
});

const ChatBot = ({ session }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const handleUserInput = async (event) => {
    event.preventDefault();
    console.log(count);
    try {
      setIsLoading(true);
      setUserInput("");
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: "user", content: userInput },
      ]);

      //Calling openai completion api, passing an obj with 2 properties, "messages" & "model"
      //messages property is an array of message obj which represent the chat history so far.
      //Model property is the name of openai model that we want to use to generate the chat bot response
      const chatCompletion = await openai.chat.completions.create({
        messages: [...chatHistory, { role: "assistant", content: userInput }],
        model: "gpt-3.5-turbo",
      });
      console.log(chatCompletion);
      //updating the chat history, adding a new message obj with the role of assistant and the content of chatCompletion.choices[0].message.content.
      //chatCompletion.choices[0].message.content -> is the response that the openai model generated base on the chat History and the user input, basically chatCompletion.choices is an array of possible responses [0] means we pick the 1st response which is usually the most relevant one
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          role: "assistant",
          content: noTokenLeft[Math.floor(Math.random() * 20)].content,
        },
      ]);
      setCount((prev) => (prev + 1) % noTokenLeft.length);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.childContainer}>
        <div className={styles.chatContainer}>
          {/* header */}
          <div className={styles.chatBoxHeader}>
            <img className={styles.chatBoxHeaderImage} src="/bot.png" />
            <div>
              <div className={styles.title}>Chatbot Assistant</div>
              <div className={`${styles.subHeading}`}>
                Welcome to the world of AI powered assistant.
              </div>
            </div>
            <button
              className={`${styles.shareBtn} !font-semibold font-mono`}
              variant="contained"
            >
              Share
            </button>
          </div>
          {/* main body */}
          <div className={styles.chatBoxMainBody}>
            <img
              className={styles.chatBoxbgImage}
              src="/jesus.png"
              alt="jesus.png"
            />
            <div className={`${styles.chats} ${styles.scrollContainer}`}>
              {chatHistory.map((message, index) => {
                console.log(message);
                if (message.role === "user") {
                  return (
                    <div key={index} className={styles.questionContainer}>
                      <div>
                        <img
                          className={styles.jesusImg}
                          src={session.user.image || "/noavatar.png"}
                          alt="jesus.png"
                        />
                      </div>
                      <div className={styles.userQuestion}>
                        <div
                          className={`${styles.scrollContainer} ${styles.userQuestionContent}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={styles.aiFirstResponseContainer}
                    >
                      <div>
                        <img
                          className={styles.jesusImg}
                          src="/bot.png"
                          alt="jesus.png"
                        />
                      </div>
                      <div
                        className={`${styles.scrollContainer} ${styles.aiResponseContent}`}
                      >
                        {message.content}
                      </div>
                    </div>
                  );
                }
              })}
              {/* <div className={styles.questionContainer}>
                <div>
                  <img
                    className={styles.jesusImg}
                    src={session?.user.image || "/noavatar.png"}
                    alt="jesus.png"
                  />
                </div>
                <div className={styles.userQuestion}>
                  <div
                    className={`${styles.scrollContainer} ${styles.userQuestionContent}`}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis soluta autem recusandae incidunt deserunt magnam
                    labore quod, architecto porro temporibus aliquam accusamus
                    molestiae reprehenderit cumque facilis quibusdam quis error
                    ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Nobis soluta autem recusandae incidunt deserunt magnam
                    labore quod, architecto porro temporibus aliquam accusamus
                    molestiae reprehenderit cumque facilis quibusdam quis error
                    ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Nobis soluta autem recusandae incidunt deserunt magnam
                    labore quod, architecto porro temporibus aliquam accusamus
                    molestiae reprehenderit cumque facilis quibusdam quis error
                    ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Nobis soluta autem recusandae incidunt deserunt magnam
                    labore quod, architecto porro temporibus aliquam accusamus
                    molestiae reprehenderit cumque facilis quibusdam quis error
                    ipsum. Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Nobis soluta autem recusandae incidunt deserunt magnam
                    labore quod, architecto porro temporibus aliquam accusamus
                    molestiae reprehenderit cumque facilis quibusdam quis error
                    ipsum.
                  </div>
                </div>
              </div>

              <div className={styles.aiFirstResponseContainer}>
                <div>
                  <img
                    className={styles.jesusImg}
                    src="/jesus.png"
                    alt="jesus.png"
                  />
                </div>
                <div
                  className={`${styles.scrollContainer} ${styles.aiResponseContent}`}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nobis soluta autem recusandae incidunt deserunt magnam labore
                  quod, architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                  soluta autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                  soluta autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                  soluta autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                  soluta autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. ipsum
                  dolor sit amet consectetur, adipisicing elit. Nobis soluta
                  autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum. ipsum
                  dolor sit amet consectetur, adipisicing elit. Nobis soluta
                  autem recusandae incidunt deserunt magnam labore quod,
                  architecto porro temporibus aliquam accusamus molestiae
                  reprehenderit cumque facilis quibusdam quis error ipsum.
                </div>
              </div> */}
            </div>
          </div>

          {/* Footer */}
          <form onSubmit={handleUserInput} className={styles.chatBoxFooter}>
            <input
              required
              type="text"
              className={styles.chatBoxInput}
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              placeholder="Ask me anything"
              readOnly={isLoading}
            />
            <button
              disabled={isLoading}
              className={`${isLoading ? styles.btnDisabled : ""}`}
              type="submit"
            >
              {isLoading ? (
                <div>
                  <ReactLoading type="spin" height={20} width={20} />
                </div>
              ) : (
                "Ask"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
