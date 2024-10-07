"use client";
import axios from "axios";
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
          form="infos"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Infomations from you
        </label>
        <input
          type="infos"
          id="infos"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <br></br>
      <input
        checked
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
        I agree to the{" "}
        <Link
          href="/terms"
          className="text-blue-600 hover:underline dark:text-blue-500"
        >
          terms and conditions
        </Link>
        .<p className="text-red-600 inline">*</p>
      </label>
      <br></br>
      <br></br>
      <button
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
        type="submit"
      >
        Event Anmeldung with Discord
      </button>

      <input type="hidden" id="ID" value={postID} />
    </form>
  );
}
