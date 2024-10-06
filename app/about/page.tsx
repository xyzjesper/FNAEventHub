import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md">
          <h1 className="text-center mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 items-center mx-auto text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            FNA-Events
          </h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Was ist FNA-Events?
            </h2>
            <p className="text-lg">
              FNA-Events wird eine Website, auf der Turniere und Events in
              verschiedenen Spielen wie z.B. <strong>Golf IT</strong>,{" "}
              <strong>Minecraft</strong>, <strong>Valorant</strong> oder auch
              Quizze angekündigt werden. Auf dieser Website könnt ihr euch dann
              immer für das anstehende Event anmelden und bekommt im Discord
              Zugriff auf den jeweiligen Bereich.
            </p>
            <p className="text-lg mt-4">
              Viele Events beinhalten sogar Preisgelder oder andere Preise. Das
              Ziel ist es, mindestens jeden Monat 2 Events zu veranstalten.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Gibt es Voraussetzungen bei den Events?
            </h2>
            <p className="text-lg">
              Bei manchen Events werden Spiele vorausgesetzt, oder bei manchen
              werden die Spiele sogar vom Hoster des Events gesponsert.
              Ansonsten kann jeder gerne mitmachen und tolle Gewinne abstauben.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Kann man FNA-Events unterstützen?
            </h2>
            <p className="text-lg">
              Ja, FNA-Events kann durch eine Spende unterstützt werden, oder ihr
              bewerbt euch als Helfer und helft somit beim Organisieren und
              Durchführen der Events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Fragen oder Anliegen?
            </h2>
            <p className="text-lg">
              Solltet ihr weitere Fragen oder Anliegen haben, meldet euch gerne
              im Support.
            </p>
            <p className="mt-4 text-right  text-center mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 items-center font-semibold">
              Mit freundlichen Grüßen,
              <br />
              <strong>PexyFNA - Leitung</strong>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
