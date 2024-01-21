import styles from "./adminUsers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { GET_ALL_USER } from "@/lib/data";

const AdminUsers = async () => {
  const users = await GET_ALL_USER();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.detail}>
            <Image
              src={user.img || "/noavatar.png"}
              alt="user.png"
              width={50}
              height={50}
            />
            <span>{user.username}</span>
          </div>
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user.id} />
            <button className={styles.userButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;