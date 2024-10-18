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

  // Sort posts by highest event ID
  data.sort((a, b) => b.ID - a.ID);

  return data.map((post) => {
    return {
      EventName: post.EventName,
      Description: post.Description,
      ID: post.ID,
      Image: post.Image,
      Turnier: post.Turnier,
      Kooperation: post.Kooperation,
    };
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="prose dark:prose-invert items-center object-center">
      {posts.map((post, index) => (
        <Link
          key={index}
          className="text-blue-500 dark:text-blue-400 hover:underline no-underline"
          href={`/posts/${post.ID}`}
        >
          <div className="bg-gray-800 rounded-3xl shadow-lg p-6 m-4 transition-transform transform hover:scale-105 text-slate-50">
            <div className="flex flex-col items-center">
              {post.Image ? (
                <Image src={post.Image} alt="Logo" width={300} height={300} />
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

              <h1 className="text-2xl text-gray-300 font-bold mb-2">
                {post.EventName}
              </h1>
              <p className="text-gray-300 mb-4">{post.Description}</p>
              <div className="flex justify-center space-x-4 mb-6 no-underline">
                {post.Turnier ? (
                  <span className="bg-yellow-600 text-white px-6 py-3 text-lg rounded-full shadow-lg no-underline">
                    Turnier
                  </span>
                ) : post.Kooperation ? (
                  <span className="bg-green-400 text-white px-6 py-3 text-lg rounded-full shadow-lg no-underline">
                    Kooperation
                  </span>
                ) : (
                  <span className="bg-purple-500 text-white px-6 py-3 text-lg rounded-full shadow-lg no-underline">
                    Event
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
