"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface SiginFormProps {
  postID: string;
}

const sendEventData = async (event: React.FormEvent) => {
  event.preventDefault();

  const discordurl = process.env.NEXTAUTHURL;

  const authUrl =
    discordurl +
    `&state=${
      (document.getElementById("ID") as HTMLInputElement)?.value ?? ""
    }-${Buffer.from(
      (document.getElementById("infos") as HTMLInputElement)?.value ??
        "keine info"
    ).toString("base64")}`;

  if (authUrl) {
    window.location.href = authUrl;
  } else {
    console.error("AUTHURL is not defined in the environment variables");
  }
};

export function SiginForm({ postID }: { postID: string }): JSX.Element {
  return (
    <form className="max-w-sm mx-auto" onSubmit={sendEventData}>
      <div className="mb-5">
        <label
          htmlFor="infos"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <h5>Weitere Infos</h5>
        </label>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          Bitte gebe zusätzliche Informationen ein, die für das Event relevant
          sein könnten. (Event Team Partner, etc.)
        </p>
        <input
          type="text"
          id="infos"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <br></br>
      <input
        id="checkbox-1"
        required
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        form="checkbox-1"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Ich akzeptiere die{" "}
        <Link
          href="/terms"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          allgemeinen AGB's
        </Link>
        .<p className="text-red-600 inline">*</p>
      </label>
      <br></br>
      <br></br>
      <button
        className="text-center w-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 inline-flex items-center justify-center me-2 mb-2 transition-all duration-300"
        type="submit"
      >
        <Image
          className="mr-2"
          src={"/discord-mark-white.png"}
          alt="Discord"
          height={16}
          width={16}
        />
        <p className="text-center">Mit Discord anmelden</p>
      </button>

      <input type="hidden" id="ID" value={postID} />
    </form>
  );
}
