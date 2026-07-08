// components/MentionsLegales.tsx
export default function LegalNotice() {
  const neonHeading =
    "font-bold tracking-wide text-[#00e5ff] [text-shadow:0_0_6px_#00e5ff,0_0_14px_#00e5ff,0_0_24px_#00e5ff]";

  // Échelle fluide : min 1.5rem, idéal 4vw, max 2rem (h2)
  const h2Size = "text-[clamp(1.5rem,4vw,2rem)]";
  // h3 un cran en dessous
  const h3Size = "text-[clamp(1.25rem,3vw,1.5rem)]";
  // texte courant, un peu plus grand sur mobile pour la lisibilité
  const bodySize = "text-[clamp(0.95rem,2.2vw,1.0625rem)]";

  return (
    <section
      className={`prose prose-invert max-w-none ${bodySize} leading-relaxed`}
    >
      <h2 className={`${h2Size} mb-5 ${neonHeading} text-center`}>
        Mentions légales
      </h2>

      <section className="space-y-4">
        <h3 className={`${h3Size} mt-8 mb-3 ${neonHeading}`}>
          Éditeur du site
        </h3>

        <p>
          Site édité par <strong>Marcos Manzanares</strong>, porteur de projet,
          exerçant sous l&apos;enseigne <strong>codercat</strong>, dans le cadre
          d&apos;un Contrat d&apos;Appui au Projet d&apos;Entreprise (CAPE)
          conclu avec:
        </p>

        <address className="not-italic">
          <strong>INCUBATEST FLANDRE DUNKERQUE (BGE Flandre Création)</strong>
          <br />
          Association loi 1901
          <br />
          Siège social : 33 rue du Ponceau Lucien Duffuler, La Turbine, 59140
          Dunkerque
          <br />
          SIRET : 754 022 572 00020
        </address>

        <dl className="grid gap-2 sm:grid-cols-[180px_1fr]">
          <dt className="font-medium">Téléphone</dt>
          <dd>
            <a href="tel:+33780385362">07&nbsp;80&nbsp;38&nbsp;53&nbsp;62</a>
          </dd>

          <dt className="font-medium">Email</dt>
          <dd>
            <a href="mailto:manzanaresdev@gmail.com">manzanaresdev@gmail.com</a>
          </dd>

          <dt className="font-medium">Responsable de la publication</dt>
          <dd>Marcos Manzanares</dd>
        </dl>
      </section>

      <section className="mt-10 space-y-4">
        <h3 className={`${h3Size} mt-8 mb-3 ${neonHeading}`}>Hébergement</h3>

        <dl className="grid gap-2 sm:grid-cols-[180px_1fr]">
          <dt className="font-medium">Hébergeur</dt>
          <dd>Vercel Inc.</dd>

          <dt className="font-medium">Adresse</dt>
          <dd>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</dd>

          <dt className="font-medium">Site web</dt>
          <dd>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com
            </a>
          </dd>

          <dt className="font-medium">Email</dt>
          <dd>
            <a href="mailto:privacy@vercel.com">privacy@vercel.com</a>
          </dd>
        </dl>

        <p>
          Le nom de domaine est enregistré auprès d&apos;OVHcloud et les DNS
          sont gérés via Cloudflare, Inc., sans incidence sur l&apos;hébergement
          du contenu du site.
        </p>
      </section>
    </section>
  );
}
