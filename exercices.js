/**
 * Code de base, ne pas modifier
 */

// Définition
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const loaderEpoqueHTML = document.querySelector(".voyage_en_cours");
const loaderArtefactHTML = document.querySelector(".recherche_en_cours");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(".form__recherche_artefact");

const epoques = {
  romaine: "Romaine",
  medievale: "Médievale",
  jurassique: "Jurassique",
};

const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const afficherDestination = (nomEpoque) => (localisationEpoqueHTML.textContent = nomEpoque);

// Execution
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");

  if (!artefact) {
    alert("Choisie un artefact à collecter !");
    return;
  }

  quandRechercheArtefact(artefact);
});

const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */
let nomEpoqueActuelle = localisationEpoqueHTML.textContent;

creerLesChoixEpoque(epoques);

// Exercice 1 : Le Téléporteur Temporel

/**
 * Fonction pour simuler un voyage temporel.
 * @param {string} destination - Époque de destination
 * @param {Function} callback  - Fonction de rappel à exécuter une fois le voyage terminé
 */
const voyagerTemps = (destination, callback) => {
  setTimeout(() => {
    callback(destination);
  }, generationNombreAleatoireEntre(1000, 3000));
};

/**
 * Fonction déclenchée après la soumission du formulaire de voyage temporel.
 * Elle met à jour l'époque et gère l'affichage du loader pendant le voyage.
 * @param {string} nomEpoque - Époque sélectionnée
 */
const quandEpoqueChoisie = (nomEpoque) => {
  nomEpoqueActuelle = nomEpoque;
  localisationEpoqueHTML.style.display = "none";
  loaderEpoqueHTML.style.display = "inline-block";
  voyagerTemps(nomEpoqueActuelle, (epoque) => {
    afficherDestination(epoque);
    loaderEpoqueHTML.style.display = "none";
    localisationEpoqueHTML.style.display = "inline-block";
  });
};

// Exercice 2 : La Collecte d'Artefact Mystère

/**
 * Fonction pour simuler la collecte d'un artefact.
 * @param {string} objet      - Artefact à collecter
 * @param {Function} callback - Fonction de rappel à exécuter une fois l'artefact collecté
 */
const collecterArtefact = (nom, callback) => {
  setTimeout(() => {
    callback(nom);
  }, generationNombreAleatoireEntre(1000, 3000));
};

/**
 * Fonction déclenchée après la soumission du formulaire de recherche d'artefacts.
 * Elle affiche un message indiquant si la collecte d'un artefact a réussi ou échoué.
 * La réussite ou l'échec est déterminé aléatoirement.
 *
 * @param {string} artefact - Artefact recherché
 */
const quandRechercheArtefact = (artefact) => {
  loaderArtefactHTML.style.display = "block";
  collecterArtefact(artefact, (nomArtefact) => {
    // Objet contenant les informations de l'artefact
    const artefactInfos = { artefact: nomArtefact, epoque: nomEpoqueActuelle };
    loaderArtefactHTML.style.display = "none";
    Math.random() >= 0.5
      ? afficherRechercheArtefact({ ...artefactInfos }) // Succès (par défaut)
      : afficherRechercheArtefact({ ...artefactInfos, success: false }); // Échec (explicite)
  });
};
