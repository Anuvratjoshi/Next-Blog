"use client";
import React from "react";
import ReactLoading from "react-loading";
import styles from "./loading.module.css"

const LoadingAnimation = () => {
  return (
    <div className={styles.container}>
      <ReactLoading type="bars" />
    </div>
  );
};

export default LoadingAnimation;
