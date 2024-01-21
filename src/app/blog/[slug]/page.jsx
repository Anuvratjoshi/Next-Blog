import Image from "next/image";
import styles from "./singlePost.module.css";
import GetUser from "@/components/getuser/GetUser";
import { Suspense } from "react";
import { GET_SINGLE_POST } from "@/lib/data";
import axios from "axios";

const getData = async (slug) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/blog/${slug}`);

    const postData = await res.data;
    // console.log(postData);
    return postData;
  } catch (error) {
    console.log("Error :", error.message);
    throw new Error("Something went wrong");
  }
};

//we can't use metadata because we have to fetch the post first.
export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await GET_SINGLE_POST(slug);

  return {
    title: post?.title,
    description: post?.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  //Fetch data with an api
  const particularPost = await getData(params.slug);

  //Fetch data without an api
  // const particularPost = await GET_SINGLE_POST(params.slug);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {particularPost.img && (
          <Image
            src={particularPost?.img}
            alt={particularPost.title}
            fill
            className={styles.img}
          />
        )}
      </div>
      <div className={styles.imgContainerMobile}>
        {particularPost.img && (
          <img
            src={particularPost?.img}
            alt={particularPost.title}
            className={styles.img}
            width={400}
            height={450}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{particularPost?.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <GetUser userId={particularPost.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {new Date(particularPost?.createdAt)?.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={styles.content}>{particularPost?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
