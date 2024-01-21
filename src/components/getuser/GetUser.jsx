import React from "react";
import styles from "./getuser.module.css";
import { GET_USER } from "@/lib/data";
import Image from "next/image";

const getUserUsingUserId = async (id) => {
  // Fetch using an API
  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/users/${parseInt(id)}`,
  //   { cache: "no-store" }
  // );
  // if (!response.ok) {
  //   throw new Error("Something went wrong");
  // }
  // return response.json();
};
const GetUser = async ({ userId }) => {
  // const user = await getUserUsingUserId(userId);
  // console.log(user);

  const user = await GET_USER(userId);
  return (
    <div className={styles.container}>
      <Image
        src={user?.img ? user.img : "/noavatar.png"}
        alt="adsad"
        className={styles.avatar}
        height={50}
        width={50}
      />
      <div className={styles.texts}>
        <span className={styles.detailTitle}>Author</span>
        <span className={styles.detailValue}>{user?.username}</span>
      </div>
    </div>
  );
};

export default GetUser;
