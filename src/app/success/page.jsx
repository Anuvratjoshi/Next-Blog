import React from "react";
import styles from "./success.module.css";
import Link from "next/link";
import Image from "next/image";
const Success = () => {
  return (
    <div className={styles.container}>
      <div className={styles.successMessage}>
        <h2>Thank You for Your Donation!</h2>
        <p>Your support makes a difference.</p>
      </div>
      <div className={styles.imageContainer}>
        {/* You can add an image or an SVG illustration here */}
        <Image
          src="/hero.gif"
          alt="Success Illustration"
          height={350}
          width={350}
        />
      </div>
      <Link href="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
