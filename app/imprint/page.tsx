import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen p-6 max-w-4xl mx-auto p-8 rounded-3xl bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
          <h1 className="text-center mt-6 mb-12 bg-gradient-to-br to-blue-500 via-purple-600 from-pink-300 bg-clip-text text-transparent selection:text-gray-700 dark:selection:text-white/90 items-center mx-auto text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            Impressum
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="text-lg">
              Jesper Richert
              <br /> Kiebitzreihe 2<br />
              25813 Husum - Germany
              <br />
              <span className="block text-sm text-gray-500 mt-2">
                (Diese Adresse dient ausschließlich für den Impressum-Kontakt.
                Bitte verwenden Sie die E-Mail-Adresse für alle Anfragen, außer
                es ist kein E-Mail-Kontakt möglich.)
              </span>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Kontakt
            </h2>
            <p className="text-lg">
              E-Mail: contact@nexocrew.com
              <br />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-lg">
              - Luca Fest - info@fna-events.de
              <br />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Haftungsausschluss
            </h2>
            <p className="text-lg">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4"></h2>
            <p className="text-lg">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Urheberrecht
            </h2>
            <p className="text-lg">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
              Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
              des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
          <br></br>

          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Weitere Informationen
            </h2>
            <p className="text-lg">
              Diese website unterliegt auch den Nexocrew Terms of Service. Und wir auch von diesen betrieben. <br />

              <Link className="text-blue-600" href="https://nexocrew.com/terms">
                Terms of service
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
