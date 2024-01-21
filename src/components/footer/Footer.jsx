"use client";
import { useContext } from "react";
import styles from "./footer.module.css";
import { ThemeContext } from "@/context/ThemeContext";

const Footer = () => {
  const { switchDark, switchLight, theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <span>AnuvratDev</span>
        <span
          onClick={theme === "dark" ? switchLight : switchDark}
          className={styles.mode}
        >
          {theme === "light" ? "🌙" : "🌞"}
        </span>
      </div>
      <div className={styles.text}>
        Anuvrat creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
