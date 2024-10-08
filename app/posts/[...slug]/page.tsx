import { notFound } from "next/navigation";

import { Metadata } from "next";
// import { Mdx } from "@/components/mdx-components";
import { SiginForm } from "@/components/SiginForm";
import eventDB from "../../../backend/database/schemas/eventroles";
import { connect, default as mongoose } from "mongoose";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
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
      {/* Code MDX */}
      <Markdown
        options={{
          overrides: {
            h1: { props: { className: 'text-white' } },
            h2: { props: { className: 'text-white' } },
            h3: { props: { className: 'text-white' } },
            p: { props: { className: 'text-white' } },
            li: { props: { className: 'text-white' } },
            a: { props: { className: 'text-white' } },
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
