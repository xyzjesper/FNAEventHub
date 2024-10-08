import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export function APIError(): JSX.Element {
  return (
    <>
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gray-800 text-white text-center">
        <Image
          className="mx-auto mt-32"
          alt="Logo"
          src={"/logo.png"}
          width={300}
          height={300}
        />

        <div suppressHydrationWarning className="mt-10">
          <p className="mx-auto text-xl font-semibold">
            <p className="mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 selection:text-white/90 mx-auto text-2xl font-semibold">
              Ein Fehler ist aufgetreten
            </p>
            <p className="mt-6 mb-12 bg-gradient-to-br to-yellow-300 via-red-600 from-orange-500 bg-clip-text text-transparent selection:text-gray-700 selection:text-white/90">
              Du bist schon angemeldet oder hast einen Fehler gemacht.
            </p>
            <p className="text-center">
              Auf unserem{" "}
              <Link
                className="text-center mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 selection:text-white/90 items-center font-semibold"
                href="/discord"
              >
                {" "}
                Discord{" "}
              </Link>{" "}
              gibt es alle weiteren Infos.
            </p>
          </p>
          <br />
          <p className="text-center font-semibold">
            Wenn du schon auf dem Discord bist hast du nun deine Event Role
            bekommen wenn nicht trete bitte bei.
          </p>
        </div>
      </div>
    </>
  );
}
