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

// Exercice 3 : La Mission Temporelle Complexe

/**
 * Fonction pour afficher un message indiquant si la collecte d'un artefact a réussi ou échoué.
 * La réussite ou l'échec est déterminé aléatoirement.
 *
 * @param {string} artefact - Artefact à collecter
 * @param {string} epoque   - Époque
 */
const logCollecte = (artefact, epoque) => {
  console.log(`${Math.random() >= 0.5 ? "✅" : "❌"} ${artefact} (Époque ${epoque})`);
};

/**
 * Fonction pour simuler une mission temporelle complexe avec des étapes imbriquées.
 * L'objectif est de reproduire le problème du "callback hell".
 */
const missionTemporelleComplexe = () => {
  let epoqueActuelle = null;
  console.log("🕰️ Début de la mission temporelle...");

  // Étape 1 : Voyager à l'époque médiévale
  voyagerTemps("Médiévale", (epoque) => {
    epoqueActuelle = epoque;
    console.log(`📍 Arrivé à l'époque ${epoque}`);

    // Étape 2 : Collecter une épée de chevalier
    collecterArtefact("Épée de chevalier", (artefact) => {
      logCollecte(artefact, epoqueActuelle);

      // Étape 3 : Voyager à l'époque Romaine
      voyagerTemps("Romaine", (epoque) => {
        epoqueActuelle = epoque;
        console.log(`📍 Arrivé à l'époque ${epoque}`);

        // Étape 4 : Collecter un bouclier romain
        collecterArtefact("Bouclier romain", (artefact) => {
          logCollecte(artefact, epoqueActuelle);

          // Étape 5 : Collecter une épée romaine
          collecterArtefact("Épée romaine", (artefact) => {
            logCollecte(artefact, epoqueActuelle);

            console.log("🏁 Fin de la mission temporelle");
          });
        });
      });
    });
  });
};

// missionTemporelleComplexe();

// Exercice 4 : Je te promet des voyages temporels sans tracas !

/**
 * Fonction pour simuler un voyage temporel.
 * La promesse est résolue après un délai aléatoire.
 *
 * @param {string} destination - Époque de destination
 * @returns {Promise<string>}  - Promesse qui se résout avec la destination atteinte
 */
const voyagerTemps2 = (destination) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📍 Arrivé à l'époque ${destination}`);
      resolve(destination);
    }, generationNombreAleatoireEntre(1000, 3000));
  });
};

/**
 * Fonction pour simuler la collecte d'un artefact.
 * La collecte réussit ou échoue de manière aléatoire.
 *
 * @param {string} artefact                                 - Artefact à collecter
 * @param {string} epoque                                   - Époque
 * @returns {Promise<{ artefact: string, epoque: string }>} - Promesse qui se résout avec une collecte réussie, sinon rejet avec une erreur.
 */
const collecterArtefact2 = (artefact, epoque) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        console.log(`✅ ${artefact} (Époque ${epoque})`);
        resolve({ artefact, epoque });
      } else {
        reject(new Error(`❌ ${artefact} (Époque ${epoque})`));
      }
    }, generationNombreAleatoireEntre(1000, 3000));
  });
};

/**
 * Fonction pour simuler une mission temporelle complexe.
 * Utilise des promesses chaînées pour gérer les voyages et les collectes de manière asynchrone.
 */
// const missionTemporelleComplexe2 = () => {
//   console.log("🕰️ Début de la mission temporelle...");
//   voyagerTemps2("Médiévale")
//     .then((epoque) => collecterArtefact2("Épée de chevalier", epoque))
//     .then(() => voyagerTemps2("Romaine"))
//     .then((epoque) => collecterArtefact2("Bouclier romain", epoque))
//     .then(({ epoque }) => collecterArtefact2("Épée romaine", epoque))
//     .then(() => console.log("🏁 Fin de la mission temporelle"))
//     .catch((erreur) => console.error(erreur.message));
// };

/**
 * Fonction pour simuler une mission temporelle complexe.
 * Utilise des promesses chaînées pour gérer les voyages et les collectes de manière asynchrone.
 */
const missionTemporelleComplexe2 = () => {
  console.log("⏳ Début de la mission temporelle...");
  voyagerTemps2("Médiévale")
    .then((epoque) =>
      collecterArtefact2("Épée de chevalier", epoque).catch((erreur) => {
        console.error(erreur.message);
        return null;
      })
    )
    .then(() => voyagerTemps2("Romaine"))
    .then((epoque) =>
      collecterArtefact2("Bouclier romain", epoque).catch((erreur) => {
        console.error(erreur.message);
        return null;
      })
    )
    .then(() =>
      collecterArtefact2("Épée romaine", "Romaine").catch((erreur) => {
        console.error(erreur.message);
        return null;
      })
    )
    .then(() => console.log("🏁 Fin de la mission temporelle"));
};

missionTemporelleComplexe2();
