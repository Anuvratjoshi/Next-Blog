"use client";
import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  /*
  we do not want to call our await auth() directly here because this is a client component and we have to prevent our client component from being async function
  const session = await auth()
  console.log(session);
  so we will take our session as a prop
  */
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={""}>
      <div className={styles.links}>
        {!session?.user
          ? links
              .slice(0, -1)
              .map((item) => <NavLink key={item.title} item={item} />)
          : links.map((item) => <NavLink key={item.title} item={item} />)}
        {session ? (
          <>
            {session.user?.isAdmin && (
              <>
                <NavLink item={{ title: "Admin", path: "/admin" }} />
              </>
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
      </div>
      <Image
        src="/menu.png"
        height={30}
        width={30}
        className={styles.menuButton}
        onClick={toggleMenu}
      />

      <div className={`${styles.mobileLinks} ${open ? styles.open : ""}`}>
        <span onClick={toggleMenu} className={styles.close}>
          X
        </span>
        {!session?.user
          ? links
              .slice(0, -1)
              .map((item) => <NavLink key={item.title} item={item} />)
          : links.map((item) => <NavLink key={item.title} item={item} />)}
        {session ? (
          <>
            {session.user?.isAdmin && (
              <>
                <NavLink item={{ title: "Admin", path: "/admin" }} />
              </>
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
      </div>
    </div>
  );
};

export default Links;
