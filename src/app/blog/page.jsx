import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";
import axios from "axios";
// import { GET_POSTS } from "../../lib/data";
const getData = async () => {
  // const res = await fetch("http://localhost:3000/api/blog",{cache:"no-store"});
  // if (!res.ok) {
  //   throw new Error("something went wrong");
  // } else {
  //   const data  =await res.json();
  //   console.log(data);

  //   return data.posts;
  // }

  try {
    const response = await axios.get("http://localhost:3000/api/blog");

    // console.log(response.data);
    return response?.data?.posts.reverse();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const metadata = {
  title: "Blog Page",
  description: "Blog description",
};
const BlogPage = async () => {
  // Fetch with an api
  const posts = await getData();
  // Fetch without an api
  // const posts = await GET_POSTS();
  return (
    <div className={styles.container}>
      {!posts.length ? (
        <div className={styles.noBlogs}>
          <p>
            Currently, our blog is awaiting its first entry. Stay tuned for
            insightful content coming your way soon!
          </p>
        </div>
      ) : (
        posts?.map((particularPost) => (
          <div className={styles.post} key={particularPost?._id}>
            <PostCard post={particularPost} />
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPage;
