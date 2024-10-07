import Link from "next/link";

import eventDB from "../backend/database/schemas/eventroles";
import { connect, default as mongoose } from "mongoose";
import Image from "next/image";

mongoose.set("strictQuery", true);
const mongoUrl = process.env.MONGODBURL;

if (!mongoUrl) {
  throw new Error("MONGODBURL environment variable is not defined");
}

connect(mongoUrl, {
  keepAlive: true,
  dbName: process.env.DBNAME,
})
  .then(() => console.log("The bot is Connected to the Database"))

  .catch((error) => {
    console.log(error);
  });

process.on("uncaughtException", function (err) {
  console.log(err);
});

export async function getPosts() {
  const data = await eventDB.find().sort("-id Date EventName");
  if (!data) {
    return [];
  }

  return data.map((post) => {
    return {
      EventName: post.EventName,
      Description: post.Description,
      ID: post.ID,
      Image: post.Image,
    };
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="prose dark:prose-invert items-center object-center">
      {posts.map((post, index) => (
        <Link
          className="text-blue-500 dark:text-blue-400 hover:underline"
          href={`/posts/${post.ID}`}
        >
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 m-4 transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              {post.Image ? (
                <Image
                  src={post.Image}
                  alt="Logo"
                  width={300}
                  height={300}
                ></Image>
              ) : (
                <Image
                  className="mb-4"
                  src={post.Image ? post.Image : "/logo.png"}
                  width={300}
                  sizes="any"
                  height={300}
                  alt={post.EventName}
                />
              )}

              <h1 className="text-2xl font-bold mb-2">{post.EventName}</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.Description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
