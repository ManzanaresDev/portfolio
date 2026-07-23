// components/MentionsLegalesSection.tsx
"use client";

import { Trans, useTranslation } from "react-i18next";

export default function LegalNotice() {
  const { t } = useTranslation();

  return (
    <>
      <h2 style={{ color: "white", marginTop: 0 }}>{t("legalNotice.title")}</h2>

      {/* Définitions */}
      <h3 style={titleStyle}>{t("legalNotice.definitions.title")}</h3>

      <p>
        <Trans i18nKey="legalNotice.definitions.client">
          <strong>Client :</strong> texte
        </Trans>
      </p>
      <p>
        <Trans i18nKey="legalNotice.definitions.services">
          <strong>Prestations et Services :</strong>{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>
      <p>
        <Trans i18nKey="legalNotice.definitions.content">
          <strong>Contenu :</strong> texte
        </Trans>
      </p>
      <p>
        <Trans i18nKey="legalNotice.definitions.clientInfo">
          <strong>Informations clients :</strong> texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>
      <p>
        <Trans i18nKey="legalNotice.definitions.user">
          <strong>Utilisateur :</strong> texte
        </Trans>
      </p>
      <p>
        <Trans i18nKey="legalNotice.definitions.personalInfo">
          <strong>Informations personnelles :</strong> texte
        </Trans>
      </p>
      <p>{t("legalNotice.definitions.gdprTerms")}</p>

      {/* 1. Présentation du site */}
      <h3 style={titleStyle}>{t("legalNotice.section1.title")}</h3>

      <p>
        <Trans i18nKey="legalNotice.section1.intro">
          texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>

      <ul style={listStyle}>
        <li>
          <Trans i18nKey="legalNotice.section1.owner">
            <strong>Propriétaire :</strong> texte
          </Trans>
        </li>
        <li>
          <Trans i18nKey="legalNotice.section1.publisher">
            <strong>Responsable de publication :</strong> Marcos Manzanares —{" "}
            <a href="mailto:marcosmanzanaresdev@gmail.com" style={linkStyle}>
              marcosmanzanaresdev@gmail.com
            </a>
          </Trans>
        </li>
        <li>
          <Trans i18nKey="legalNotice.section1.webmaster">
            <strong>Webmaster :</strong> Marcos Manzanares —{" "}
            <a href="mailto:marcosmanzanaresdev@gmail.com" style={linkStyle}>
              marcosmanzanaresdev@gmail.com
            </a>
          </Trans>
        </li>
        <li>
          <Trans i18nKey="legalNotice.section1.host">
            <strong>Hébergeur :</strong> texte{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              vercel.com
            </a>
          </Trans>
        </li>
        <li>
          <Trans i18nKey="legalNotice.section1.dpo">
            <strong>Délégué à la protection des données :</strong> Marcos
            Manzanares —{" "}
            <a href="mailto:marcosmanzanaresdev@gmail.com" style={linkStyle}>
              marcosmanzanaresdev@gmail.com
            </a>
          </Trans>
        </li>
      </ul>

      <p>{t("legalNotice.section1.domain")}</p>

      <p style={{ fontSize: ".85rem", opacity: 0.75 }}>
        <Trans i18nKey="legalNotice.section1.credit">
          texte{" "}
          <a
            href="https://fr.orson.io/1371/generateur-mentions-legales"
            title="générateur gratuit offert par Orson.io"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            générateur gratuit offert par Orson.io
          </a>
          .
        </Trans>
      </p>

      {/* 2. CGU */}
      <h3 style={titleStyle}>{t("legalNotice.section2.title")}</h3>

      <p>{t("legalNotice.section2.paragraph1")}</p>

      <p>
        <Trans i18nKey="legalNotice.section2.paragraph2">
          texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>

      <p>{t("legalNotice.section2.paragraph3")}</p>

      {/* 3. Description des services */}
      <h3 style={titleStyle}>{t("legalNotice.section3.title")}</h3>

      <p>
        <Trans i18nKey="legalNotice.section3.paragraph1">
          texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>

      <p>{t("legalNotice.section3.paragraph2")}</p>

      {/* 4. Limitations contractuelles sur les données techniques */}
      <h3 style={titleStyle}>{t("legalNotice.section4.title")}</h3>

      <p>{t("legalNotice.section4.paragraph1")}</p>

      <p>
        <Trans i18nKey="legalNotice.section4.paragraph2">
          texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>

      <p>{t("legalNotice.section4.paragraph3")}</p>

      <p>{t("legalNotice.section4.paragraph4")}</p>

      {/* 5. Propriété intellectuelle et contrefaçons */}
      <h3 style={titleStyle}>{t("legalNotice.section5.title")}</h3>

      <p>{t("legalNotice.section5.paragraph1")}</p>

      <p>{t("legalNotice.section5.paragraph2")}</p>

      {/* 6. Limitations de responsabilité */}
      <h3 style={titleStyle}>{t("legalNotice.section6.title")}</h3>

      <p>{t("legalNotice.section6.paragraph1")}</p>

      <p>{t("legalNotice.section6.paragraph2")}</p>

      <p>{t("legalNotice.section6.paragraph3")}</p>

      {/* 7. Gestion des données personnelles */}
      <h3 style={titleStyle}>{t("legalNotice.section7.title")}</h3>

      <p>{t("legalNotice.section7.intro")}</p>

      <h4 style={subTitleStyle}>
        {t("legalNotice.section7.collectors.title")}
      </h4>

      <p>{t("legalNotice.section7.collectors.paragraph1")}</p>

      <p>{t("legalNotice.section7.collectors.paragraph2")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section7.purpose.title")}</h4>

      <p>{t("legalNotice.section7.purpose.intro")}</p>
      <ul style={listStyle}>
        <li>{t("legalNotice.section7.purpose.item1")}</li>
        <li>{t("legalNotice.section7.purpose.item2")}</li>
        <li>{t("legalNotice.section7.purpose.item3")}</li>
        <li>{t("legalNotice.section7.purpose.item4")}</li>
        <li>{t("legalNotice.section7.purpose.item5")}</li>
      </ul>

      <p>{t("legalNotice.section7.purpose.noSale")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section7.rights.title")}</h4>

      <p>{t("legalNotice.section7.rights.intro")}</p>
      <ul style={listStyle}>
        <li>{t("legalNotice.section7.rights.item1")}</li>
        <li>{t("legalNotice.section7.rights.item2")}</li>
        <li>{t("legalNotice.section7.rights.item3")}</li>
        <li>{t("legalNotice.section7.rights.item4")}</li>
        <li>{t("legalNotice.section7.rights.item5")}</li>
        <li>{t("legalNotice.section7.rights.item6")}</li>
      </ul>

      <p>{t("legalNotice.section7.rights.death")}</p>

      <p>{t("legalNotice.section7.rights.contact")}</p>

      <p>
        {t("legalNotice.section7.rights.contactName")}
        <br />
        {t("legalNotice.section7.rights.contactAddress")}
      </p>

      <p>{t("legalNotice.section7.rights.identification")}</p>

      <p>
        <Trans i18nKey="legalNotice.section7.rights.cnil">
          texte{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            cnil.fr/fr/plaintes
          </a>
          ).
        </Trans>
      </p>

      <h4 style={subTitleStyle}>
        {t("legalNotice.section7.noDisclosure.title")}
      </h4>

      <p>{t("legalNotice.section7.noDisclosure.paragraph1")}</p>

      <p>{t("legalNotice.section7.noDisclosure.paragraph2")}</p>

      <p>{t("legalNotice.section7.noDisclosure.paragraph3")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section7.dataTypes.title")}</h4>

      <p>{t("legalNotice.section7.dataTypes.paragraph1")}</p>

      <p>{t("legalNotice.section7.dataTypes.paragraph2")}</p>

      <p>{t("legalNotice.section7.dataTypes.paragraph3")}</p>

      {/* 8. Notification d'incident */}
      <h3 style={titleStyle}>{t("legalNotice.section8.title")}</h3>

      <p>{t("legalNotice.section8.paragraph1")}</p>

      <p>{t("legalNotice.section8.paragraph2")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section8.security.title")}</h4>

      <p>{t("legalNotice.section8.security.paragraph1")}</p>

      <p>{t("legalNotice.section8.security.paragraph2")}</p>

      {/* 9. Cookies et balises */}
      <h3 style={titleStyle}>{t("legalNotice.section9.title")}</h3>

      <p>{t("legalNotice.section9.paragraph1")}</p>

      <p>{t("legalNotice.section9.paragraph2")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section9.cookies.title")}</h4>

      <p>{t("legalNotice.section9.cookies.paragraph1")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph2")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph3")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph4")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph5")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph6")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph7")}</p>

      <p>{t("legalNotice.section9.cookies.paragraph8")}</p>

      <h4 style={subTitleStyle}>{t("legalNotice.section9.tags.title")}</h4>

      <p>{t("legalNotice.section9.tags.paragraph1")}</p>

      <p>{t("legalNotice.section9.tags.paragraph2")}</p>

      <p>{t("legalNotice.section9.tags.paragraph3")}</p>

      <p>{t("legalNotice.section9.tags.paragraph4")}</p>

      {/* 10. Droit applicable */}
      <h3 style={titleStyle}>{t("legalNotice.section10.title")}</h3>

      <p>
        <Trans i18nKey="legalNotice.section10.paragraph1">
          texte{" "}
          <a href="https://codercat.fr" style={linkStyle}>
            https://codercat.fr
          </a>{" "}
          texte
        </Trans>
      </p>

      <p
        style={{
          marginTop: 40,
          fontSize: ".9rem",
          opacity: 0.75,
        }}
      >
        {t("legalNotice.lastUpdate")}
      </p>
    </>
  );
}

const titleStyle: React.CSSProperties = {
  marginTop: 28,
  color: "#5c7cfa",
};

const subTitleStyle: React.CSSProperties = {
  marginTop: 20,
  color: "#5c7cfa",
  fontSize: "1.05rem",
};

const listStyle: React.CSSProperties = {
  paddingLeft: 20,
  lineHeight: 1.8,
};

const linkStyle: React.CSSProperties = {
  color: "#7dd3fc",
  textDecoration: "underline",
};
