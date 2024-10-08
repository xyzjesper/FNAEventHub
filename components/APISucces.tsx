import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export function APISucces(): JSX.Element {
  return (
    <>
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gray-800 text-white">
        <Image
          className="items-center justify-center flex ml-44 mt-32"
          alt="Logo"
          src={"/logo.png"}
          width={300}
          height={300}
        />

        <div className="mt-10">
          <p className="text-center mx-auto text-xl font-semibold ml-14">
            <p className="ml-14 mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 text-center mx-auto text-3xl font-semibold">
              Du bist nun angemeldet!
            </p>{" "}
            <p className="ml-14 text-center">
              Danke für deine Teilnahme. Auf dem
              <Link
                className="mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 text-center font-semibold"
                href="/discord"
              >
                {" "}
                Discord{" "}
              </Link>
              gibt es alle weiteren Infos.
            </p>
          </p>
          <br></br>
          <p className="font-semibold text-center">
            Wenn du schon auf dem Discord bist hast du nun deine Event Role
            bekommen wenn nicht trete bitte bei.
          </p>
        </div></div>
    </>
  );
}
