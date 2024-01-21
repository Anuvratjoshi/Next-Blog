import LoginForm from "@/components/loginForm/LoginForm";
import styles from "./login.module.css";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin} className={styles.form}>
          <input type="submit" value="Login with Github" />
          <Image src="/git.png" height={25} width={25} />
        </form>
        <form action={handleGoogleLogin} className={styles.form}>
          <input type="submit" value="Login with Google" />
          <Image src="/google.png" height={20} width={20} />
        </form>
        <LoginForm />
        <Link href="/register">
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
