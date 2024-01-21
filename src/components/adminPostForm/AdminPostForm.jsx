"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} required />
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="slug" placeholder="slug" required />
      <input type="text" name="img" placeholder="img" required />
      <textarea type="text" name="desc" placeholder="desc" rows={10} required />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
