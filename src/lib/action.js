"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

//Add post
export const addPost = async (previouState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId, img } = Object.fromEntries(formData);
  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//Delete post
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  connectToDb();
  try {
    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//Add a user
export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Delete user
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const handleGoogleLogin = async () => {
  await signIn("google");
};

// Register a user
export const register = async (previouState, formData) => {
  const { username, email, password, img, confirmPassword } =
    Object.fromEntries(formData);
  console.log(username, email, password, img, confirmPassword);
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      return { error: "Username or email is already taken" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    // if (err.code == 11000) {
    //   return { error: "User already exist" };
    // }
    return { error: "Something went wrong!" };
  }
};

export const login = async (previouState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    //we are passing userame and password but authjs does not know how we are encrypting our password so we have to define provider in auth.js file with rules
    await signIn("credentials", { email, password });
  } catch (err) {
    // console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid email or password" };
    }
    throw err;
  }
};
