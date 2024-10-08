import { notFound } from "next/navigation";

import { Metadata } from "next";
// import { Mdx } from "@/components/mdx-components";
import { SiginForm } from "@/components/SiginForm";
import eventDB from "../../../backend/database/schemas/eventroles";
import { connect, default as mongoose } from "mongoose";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import Image from "next/image";
import { link } from "fs";

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

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");

  const data = await eventDB.findOne({ ID: slug });

  if (!data) {
    null;
  }

  return data;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const postdata = await getPostFromParams(params);

  if (!postdata) {
    return {};
  }

  return {
    title: postdata.EventName + " - FNA Events",
    description: postdata.Description,
  };
}

export default async function PostPage({ params }: PostProps) {
  const postdata = await getPostFromParams(params);

  if (!postdata) {
    notFound();
  }

  return (
    <article className="p-10 py-6 prose rose-invert items-center object-center rounded-3xl bg-gray-800 text-white">
      <div className="flex flex-col items-center text-white">
        {" "}
        <div className="flex justify-center space-x-4 mb-6">
          {postdata.Turnier ? (
            <span className="bg-purple-500 text-white px-6 py-3 text-lg rounded-full shadow-lg">
              Turnier
            </span>
          ) : (
            <span className="bg-pink-400 text-white px-6 py-3 text-lg rounded-full shadow-lg">
              Event
            </span>
          )}
        </div>
        <Image
          src={postdata.Image ? postdata.Image : "/logo.png"}
          width={100}
          height={100}
          alt={postdata.EventName}
          className="mb-4"
        />
        <h1 className="mb-2 text-white">{postdata.EventName}</h1>
      </div>
      <hr className="my-4 text-white" />

      {/* Winner Board */}

      {postdata.Ended ? (
        <section className="w-full my-8">
          <h2 className="text-center text-2xl mb-6">Winner Board</h2>
          <div className="flex flex-col space-y-4">
            {[
              {
                place: 1,
                username: postdata.FirstPlace.User,
                points: postdata.FirstPlace.Points || 0,
                description: postdata.FirstPlace.Description
                  ? postdata.FirstPlace.Description
                  : "No Description",
                icon: postdata.FirstPlace.Avatar
                  ? postdata.FirstPlace.Avatar
                  : "/logo.png",
                link: postdata.FirstPlace.Link || "#",
              },
              {
                place: 2,
                username: postdata.SecondPlace.User,
                points: postdata.SecondPlace.Points || 0,
                description:
                  postdata.SecondPlace.Description || "No Description",
                icon: postdata.SecondPlace.Avatar
                  ? postdata.SecondPlace.Avatar
                  : "/logo.png",
                link: postdata.SecondPlace.Link || "#",
              },
              {
                place: 3,
                username: postdata.ThirdPlace.User,
                points: postdata.ThirdPlace.Points || 0,
                description:
                  postdata.ThirdPlace.Description || "No Description",
                icon: postdata.ThirdPlace.Avatar
                  ? postdata.ThirdPlace.Avatar
                  : "/logo.png",
                link: postdata.ThirdPlace.Link || "#",
              },
            ].map((winner, index) => (
              <Link className="no-underline" href={winner.link}>
                <div
                  key={index}
                  className="flex items-center bg-gray-700 p-4 rounded-lg"
                >
                  <Image
                    src={winner.icon}
                    width={50}
                    height={50}
                    alt={winner.username}
                    className="rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">
                      {winner.place} - {winner.username}
                    </span>
                    <span className="text-sm text-gray-300">
                      Points: {winner.points}
                    </span>
                    <span className="text-sm text-gray-400">
                      {winner.description}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Code MDX */}
      <Markdown
        options={{
          overrides: {
            h1: { props: { className: "text-white" } },
            h2: { props: { className: "text-white" } },
            h3: { props: { className: "text-white" } },
            p: { props: { className: "text-white" } },
            li: { props: { className: "text-white" } },
            a: { props: { className: "text-white" } },
          },
        }}
      >
        {String(postdata.Content)}
      </Markdown>
      <br></br>
      <br></br>
      <br></br>
      <div id="signup"></div>
      <hr></hr>
      {postdata.Looked ? (
        <h5 className="text-center text-white ">
          Das Event ist voll! Bitte warte etwas oder komme beim nächsten event
          vorbei.
        </h5>
      ) : postdata.Ended ? (
        <h5 className="text-center text-white">Das Event ist beendet!</h5>
      ) : (
        <SiginForm postID={postdata.ID} />
      )}
    </article>
  );
}
