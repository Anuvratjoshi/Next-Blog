"use client";
import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";
const NavLink = ({ item }) => {
  const pathname = usePathname();
  return (
    /*
    <Link
      href={item.path}
      className={`${
        pathname === item.path
          ? theme === "dark"
            ? styles.active_dark
            : styles.active_light
          : ""
      } ${styles.container}`}
    >
      {item.title}
    </Link>
    */
    <Link
      href={item.path}
      className={`${pathname === item.path && styles.active} ${
        styles.container
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
