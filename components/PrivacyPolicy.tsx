// components/PrivacyPolicy.tsx
export default function PrivacyPolicy() {
  return (
    <>
      <h2 style={{ color: "white", marginTop: 0 }}>
        Politique de confidentialité
      </h2>

      <p>
        La présente politique explique comment les données personnelles
        communiquées dans le cadre de lenvoi d&npos;un témoignage sont
        collectées, utilisées et protégées, conformément au Règlement Général
        sur la Protection des Données (RGPD).
      </p>

      <h3 style={titleStyle}>1. Responsable du traitement</h3>

      <p>
        Le responsable du traitement est le propriétaire du site internet
        (marcosmanzanaresdev@gmail.com). Pour toute question concernant vos
        données personnelles, vous pouvez utiliser le formulaire de contact
        disponible sur ce site.
      </p>

      <h3 style={titleStyle}>2. Données collectées</h3>

      <p>Les informations susceptibles d&npos;être collectées sont :</p>

      <ul style={listStyle}>
        <li>Nom ou prénom</li>
        <li>Nom de l&npos;entreprise (si renseigné)</li>
        <li>Projet concerné (si renseigné)</li>
        <li>Votre témoignage</li>
        <li>La note attribuée</li>
      </ul>

      <p>Aucune donnée sensible n&npos;est demandée dans ce formulaire.</p>

      <h3 style={titleStyle}>3. Finalité du traitement</h3>

      <p>Ces données sont utilisées exclusivement afin de :</p>

      <ul style={listStyle}>
        <li>publier votre témoignage sur le site ;</li>
        <li>présenter des références clients ;</li>
        <li>mettre en avant les projets réalisés ;</li>
        <li>répondre si vous souhaitez être recontacté.</li>
      </ul>

      <p>
        Aucune utilisation commerciale ou revente de vos données n&npos;est
        réalisée.
      </p>

      <h3 style={titleStyle}>4. Base légale</h3>

      <p>
        Le traitement repose sur votre consentement explicite, donné en cochant
        la case prévue à cet effet avant l&npos;envoi de votre témoignage.
      </p>

      <h3 style={titleStyle}>5. Durée de conservation</h3>

      <p>
        Les données sont conservées aussi longtemps que le témoignage est publié
        sur le site ou jusqu&npos;à votre demande de suppression.
      </p>

      <h3 style={titleStyle}>6. Destinataires</h3>

      <p>
        Les données sont uniquement accessibles au responsable du site et ne
        sont transmises à aucun tiers, sauf obligation légale.
      </p>

      <h3 style={titleStyle}>7. Vos droits</h3>

      <p>Conformément au RGPD, vous disposez des droits suivants :</p>

      <ul style={listStyle}>
        <li>droit d&npos;accès ;</li>
        <li>droit de rectification ;</li>
        <li>droit d&npos;effacement ;</li>
        <li>droit de retirer votre consentement ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit d&npos;opposition.</li>
      </ul>

      <p>
        Vous pouvez exercer ces droits à tout moment en utilisant le formulaire
        de contact présent sur ce site.
      </p>

      <h3 style={titleStyle}>8. Consentement</h3>

      <p>
        En validant le formulaire après avoir lu cette politique, vous acceptez
        que les informations renseignées (nom, entreprise, projet concerné,
        témoignage et note) soient traitées dans le seul but de publier votre
        avis sur ce site.
      </p>

      <p
        style={{
          marginTop: 40,
          fontSize: ".9rem",
          opacity: 0.75,
        }}
      >
        Dernière mise à jour : juillet 2026.
      </p>
    </>
  );
}

const titleStyle: React.CSSProperties = {
  marginTop: 28,
  color: "white",
};

const listStyle: React.CSSProperties = {
  paddingLeft: 20,
  lineHeight: 1.8,
};
