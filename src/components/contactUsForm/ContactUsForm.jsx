"use client";
import React, { useState } from "react";
import styles from "./contactus.module.css";
import axios from "axios";
const ContactUsForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const [loading, showLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    showLoading(true);
    try {
      const response = await axios.post("/api/email", data);
      if (response.data.success) {
        alert(response.data.message);
        setData({
          name: "",
          email: "",
          phone: "",
          query: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      showLoading(false);
    }
  };
  return (
    <div className={styles.formContainer}>
      {/* <HydrationTestNoSSR/> */}
      {/* <div suppressHydrationWarning>{a}</div> */}
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
          required
        />
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          value={data.phone}
          required
        />
        <textarea
          name="query"
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
          onChange={(e) => setData({ ...data, query: e.target.value })}
          value={data.query}
          required
        ></textarea>
        <button disabled={loading} type="submit">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
