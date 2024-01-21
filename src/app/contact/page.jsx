import Image from "next/image";
import styles from "./contact.module.css";
import ContactUsForm from "@/components/contactUsForm/ContactUsForm";
// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = async () => {
  // const a = Math.random();

  // console.log(a);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/contact.png"
          alt="contact.png"
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.imgContainerMobile}>
        <Image
          src="/contact.png"
          alt="contact.png"
          className={styles.img}
          height={350}
          width={350}
        />
      </div>

      <ContactUsForm />
    </div>
  );
};
export default ContactPage;
