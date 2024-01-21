"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(login, undefined);
  useEffect(() => {
    state?.success && router.push("/blog");
  }, [state?.success, router]);
  return (
    <form className={styles.form} action={formAction}>
      <input type="email" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <button>Login</button>
      {state?.error}
    </form>
  );
};

export default LoginForm;
