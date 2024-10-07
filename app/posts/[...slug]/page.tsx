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
    <article className="p-10 py-6 prose dark:prose-invert items-center object-center rounded-3xl bg-gray-800">
      <div className="flex flex-col items-center">
        <Image
          src={postdata.Image ? postdata.Image : "/logo.png"}
          width={100}
          height={100}
          alt={postdata.EventName}
          className="mb-4"
        />
        <h1 className="mb-2">{postdata.EventName}</h1>
      </div>
      <hr className="my-4" />
      {/* Code MDX */}
      <Markdown
        options={{
          overrides: {
            h1: {
              component: "h1",
              props: {
                className: "text-4xl font-bold mt-4 mb-2",
              },
            },
            h2: {
              component: "h2",
              props: {
                className: "text-3xl font-bold mt-4 mb-2",
              },
            },
            h3: {
              component: "h3",
              props: {
                className: "text-2xl font-bold mt-4 mb-2",
              },
            },
            h4: {
              component: "h4",
              props: {
                className: "text-xl font-bold mt-4 mb-2",
              },
            },
            h5: {
              component: "h5",
              props: {
                className: "text-lg font-bold mt-4 mb-2",
              },
            },
            p: {
              component: "p",
              props: {
                className: "text-gray-300 text-md",
              },
            },
            a: {
              component: "a",
              props: {
                className: "text-primary-500 underline hover:text-primary",
              },
            },
            code: {
              component: "pre",
              props: {
                className: "bg-gray-900 text-gray-300 p-3 rounded-lg mt-3",
              },
            },
            ol: {
              component: "ol",
              props: {
                className: "list-decimal list-inside",
              },
            },
            ul: {
              component: "ul",
              props: {
                className: "list-disc list-inside",
              },
            },
            li: {
              component: "li",
              props: {
                className: "text-gray-300",
              },
            },
          },
        }}
      >
        {String(postdata.Content)}
      </Markdown>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div id="signup"></div>
      <hr></hr>
      {postdata.Looked ? (
        <h5 className="text-center">
          Das Event ist voll! Bitte warte etwas oder komme beim nächsten event
          vorbei.
        </h5>
      ) : postdata.Ended ? (
        <h5 className="text-center">Das Event ist beendet!</h5>
      ) : (
        <SiginForm postID={postdata.ID} />
      )}
    </article>
  );
}
