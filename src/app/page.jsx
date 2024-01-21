import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import Support from "@/components/support/Support";
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          blanditiis adipisci minima reiciendis a autem assumenda dolore.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <Link href="/contact" className={styles.contactButton}>
            Contact
          </Link>
          <Support />
        </div>
        <div className={styles.brands}>
          <Image
            src="/brands.png"
            alt="brandimg.png"
            fill
            className={styles.brandImg}
          />
        </div>
      </div>
      <div className={styles.imgContainerMobile}>
        <Image
          src="/hero.gif"
          alt="hero.gif"
          height={350}
          width={350}
          className={styles.heroImg}
        />
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="hero.gif" fill className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Home;
