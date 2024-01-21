"use client";
import React, { useState } from "react";
import styles from "./support.module.css";
import Image from "next/image";
import axios from "axios";
// ...

const Support = () => {
  const [loading, showLoading] = useState(false);

  const supportByDonating = async () => {
    try {
      showLoading(true);
      const response = await axios.post("/api/create-checkout-session", {
        price: 200,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      showLoading(false);
    }
  };

  return (
    <div
      className={`${styles.donate} ${loading ? styles.disabled : ""}`}
      onClick={!loading ? supportByDonating : null}
    >
      <Image src="/donate.png" alt="donate.png" height={20} width={20} />
      <span>{loading ? "Redirecting..." : "Support us"}</span>
    </div>
  );
};

export default Support;
