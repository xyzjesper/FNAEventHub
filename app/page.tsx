import Link from "next/link";

import eventDB from "../backend/database/schemas/eventroles";
import { connect, default as mongoose } from "mongoose";

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
    };
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="prose dark:prose-invert">
      {posts.map((post, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 m-4">
          <h1 className="text-2xl font-bold">{post.EventName}</h1>
          <p>{post.Description}</p>
          <Link href={`/posts/${post.ID}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
