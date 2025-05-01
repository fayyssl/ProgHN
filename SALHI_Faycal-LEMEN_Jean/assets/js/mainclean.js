// Afficher / Masquer aboutme -----------------------------------------------------------------------
// Fonction pour afficher/masquer la section "aboutme"
// Fonction pour afficher/masquer les infos CV
function showHide_aboutme() { // on definit le nom de la fonction
    const section = document.getElementById("aboutme"); // on cherche quelque chose avec l'id aboutme
    const button = document.getElementById("button_aboutme"); // on cherche quelque chose avec l'id button_aboutme
    
    if (section.style.display === "none") { // on verifie si c'est caché 
        section.style.display = "block"; // si oui on la rend visible 
        button.textContent = "Masquer les infos"; // on change le boutton 
    } else {
        section.style.display = "none"; // on verifie si c'est visible maintenant  
        button.textContent = "Plus d'info sur mon CV"; // on change le boutton 
    }
} 

// Afficher date et heure -----------------------------------------------------------------------
function date_heure() { // on definit le nom de la fonction
    let now = new Date();  // on recupere l'heure et la date actuelle // pour la fonction new Date(), je m'appuie sur le contenu de cette page https://www.w3schools.com/js/tryit.asp?filename=tryjs_date_current
    let annee = now.getFullYear(); // on recupere l'année 
    let mois = ('0'+(now.getMonth()+1)).slice(-2); // on recupere tous les autres donnée avec le même schéma car il y a des mois/jouors... avec un 0 devant donc on l'ajoute si necessaire
    let jour = ('0'+now.getDate()).slice(-2);
    let heure = ('0'+now.getHours()).slice(-2); 
    let minute = ('0'+now.getMinutes()).slice(-2);
    let seconde = ('0'+now.getSeconds()).slice(-2);
    
    document.getElementById("date_display").innerHTML = "Nous sommes le "+jour+"/"+mois+"/"+annee+" et il est "+heure+"h"+minute+"min"+seconde+"s";
} //on affiche nos données qu'on a recuperer avec le texte qu'on a deja ecris afin de faire la phrase

// Mettre en majuscules -----------------------------------------------------------------------
function maj() {
    let text = document.getElementById("holder1").textContent; // on recupere le texte avec l'id holder1
    
    document.getElementById("holder1").innerHTML = text.toUpperCase(); // on le converti en majuscule avex to.UpperCase
}


// Afficher/Masker aide----------------------------------------------------------------------
function showHide_aide() {
    let div = document.getElementById("aide"); // on recupere ce qu'on souhaite dans le index avec l'id 
    let b = document.getElementById("button_aide").innerHTML; // recupere le boutton 
    
    if (div.style.display === "none") { // onn verifie si c'est masqué 
        div.style.display = "block"; // si oui alors on affiche aide
        document.getElementById("button_aide").innerHTML = "Masquer l'aide"; // change le texte du boutton pour qu'on puissse le cacher
    } else {
        div.style.display = "none"; // on verifie si c'est affiché  
        document.getElementById("button_aide").innerHTML = "Afficher l'aide"; // le boutton devient afficher l'aide
    }
}

/*------------------------------------------------------------------------------------------------------------------*/
//							OUTIL D'ANALYSE des données dans un fichier									//
/*------------------------------------------------------------------------------------------------------------------*/

// Charger le texte -----------------------------------------------------------------------
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {  //addEventListener a été utilisée en faisant référence à https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener2
        
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = /text.*/;

        if (file && textType.test(file.type)) {
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            let reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                // On appelle segText direc après le chargement
                let nbTokens = (reader.result.match(/\S+/g) || []).length;
                let nbLines = (reader.result.split(/\r?\n/) || []).length;
                document.getElementById("logger2").innerHTML = '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines +' </span>';
                
                // Segmentation auto
                let tokens = reader.result.split(/\s+/).filter(x => x.trim() != "");
                let lines = reader.result.split(/\r?\n/).filter(line => line.trim() != "");
                global_var_tokens = tokens;
                global_var_lines = lines;
            };

            // on lit concrètement le fichier.
            reader.readAsText(file);

            document.getElementById("logger1").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}
// VERSION segText()  ------------------------------------------------------------------------
function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){ // Vérifie si un fichier est chargé
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !"; // message d'erreur si pas de fichier
    } else {
        if (document.getElementById("delimID").value === "") { 
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>' // message d'erreur si pas de delimitateur
        }else{
            document.getElementById('logger3').innerHTML=""; // on enleve les mesages d'erreurs
            let text = document.getElementById("fileDisplayArea").innerText; // on recupere le texte 
            let delim = document.getElementById("delimID").value; // on recupere le delimitateur 
            let display = document.getElementById("fileDisplayArea"); // on recupere la zone d'affichagfe 
        
            let regex_delim = new RegExp( // on mets une regex pour decouper le texte 
                "["
                + delim
                    .replace("-", "\\-")
                    .replace("[", "\\[").replace("]", "\\]")
                + "\\s"
                + "]+"
            );
        
            let tokens = text.split(regex_delim); // decoupe le texte en suivant la regex
            tokens = tokens.filter(x => x.trim() != ""); // on enleve les chaine de caractere vide
            let lines = text.split(/\r?\n/); //  on decoupe en suivant les retour a la ligne
            lines = lines.filter(line => line.trim() != ""); // on enleve les ligne vide
        
            global_var_tokens = tokens; // on stock le resultat du let token 
            global_var_lines = lines; // on stock le resultat du let lines 
            display.innerHTML = tokens.join(" ");// on affiche 
        }
    }
}

// Dictionnaire -----------------------------------------------------------------
function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){ // Vérifie si un fichier est chargé
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML="";
        let tokenFreq = {}; // Objet pour stocker les fréquences
        let tokens = global_var_tokens;
        
        // Calcul des fréquences
        tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);
        
        // Convertir en tableau et trier
        let freqPairs = Object.entries(tokenFreq);
        freqPairs.sort((a, b) => b[1] - a[1]); // Tri décroissant
        
        // Préparation du tableau HTML
        let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']]; // En-tête
        let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
        let finalTable = tableArr.concat(tableData);
        
        // Génération du HTML
        let tableHtml = finalTable.map(row => 
            '<tr>' + row.map(cell => '<td>' + cell + '</td>').join('') + '</tr>'
        ).join('');
        
        // Afficher le tableau HTML dans la page
        document.getElementById('page-analysis').innerHTML = 
            '<table class="freq-table">' + tableHtml + '</table>';
    }
}

// GREP ---------------------------------------------------------------------
function grep() {
    // Vérifier si un fichier .txt a été chargé
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        // Afficher un message d'erreur
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        // Effacer tout message d'erreur précédent
        document.getElementById('logger3').innerHTML="";
        // Récupérer la valeur du champ "pôle"
        let poleInput = document.getElementById("poleID").value;
        // Vérifier si un pôle a été saisi
        if (poleInput == "") {
            // Afficher un message d'erreur
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
        } else {
            // Créer une expression régulière à partir de la valeur du champ "pôle"
            let poleRegex = new RegExp(poleInput, 'g');
            // Initialiser la variable "resultat" avec l'entête du tableau
            let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";
            // Parcourir chaque ligne du tableau "global_var_lines"
            for (let i = 0; i < global_var_lines.length; i++) {
                // Vérifier si la ligne correspond à la regex
                if (global_var_lines[i].match(poleRegex)) {
                    // Ajouter le numéro de la ligne et le résultat correspondant au tableau "resultat"
                    let lineNumber = i + 1; // Ajouter 1 car les tableaux en JavaScript commencent à l'index 0
                    resultat += "<tr><td>" + lineNumber + "</td><td>" + global_var_lines[i] + "</td></tr>";
                }
            }
            // Vérifier si des résultats ont été trouvés
            if (resultat == "<tr><th>Ligne</th><th>Résultat</th></tr>") {
                // Effacer les résulats précédent
                document.getElementById('page-analysis').innerHTML = "";
                // Afficher un message d'erreur
                document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
            } else {
                // Effacer tout message d'erreur précédent
                document.getElementById('logger3').innerHTML = "";
                // Injecter le tableau résultant dans l'élément HTML
                document.getElementById('page-analysis').innerHTML = "<table>" + resultat + "</table>";
            }
        }
    }
}

// Concordancier ---------------------------------------------------------------------------
function concordancier() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
        } else {
            document.getElementById('logger3').innerHTML="";
            let poleInput = document.getElementById('poleID').value;
            if (poleInput == "") {
                document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
                } else {
                    document.getElementById('logger3').innerHTML="";
                    let lgInput = document.getElementById('lgID').value; //voir bouton "longueur" dans index.html
                    // Vérifier si une longueur a été saisi, et si > 0
                    if (lgInput == "" || parseInt(lgInput) <= 0) { 
                    // Afficher un message d'erreur
                        document.getElementById('logger3').innerHTML = "Il faut d'abord entrer une longueur > 0 !";
                        } else {
                            // Récupérer le pôle et le convertir en regex
                            let poleRegex = new RegExp("^" + poleInput + "$", "gi"); // le "i" indique de ne pas prendre en compte la casse, ^ et $ pour délimiter le mot
                            //Récupérer la valeur de "lgInput" (longueur de contexte) et conversion en nombre entier
                            let long = parseInt(lgInput);
                        
                            // Chercher le pôle et créer une liste de concordance avec la méthode Array.prototype.reduce()
                            // On applique .reduce sur global_var_tokens. Le callback prend en paramètres acc : accumulateur initialisé à 0 ;  token : valeur courante ; i : index de la valeur courante
                            let concordance = global_var_tokens.reduce((acc, token, i) => {
                                // A chaque itération du callback on teste si le "poleRegex" correspond au token courant
                                if (poleRegex.test(token)) {
                                    // Si oui, création du contexte gauche (cLeft) et droit (cRight)
                                    let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
                                    let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
                                    acc.push([cLeft, token, cRight]); // Ajout de (contexte gauche, pôle, contexte droit) à la liste acc, comme affiché sur le navigateur en cours
                                    }
                                return acc;
                                }, []); // Initialisation avec tableau vide
                        
                            // Afficher les résultat dans une table HTML
                            let table = document.createElement("table");
                            table.innerHTML = "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>";
                            concordance.forEach(([cLeft, pole, cRight]) => { // Pour chaque résultat de concordance
                                // Insertion d'une nouvelle ligne dans la table
                                let row = table.insertRow();
                                // Ajouter les données à la ligne
                                row.innerHTML = `<td>${cLeft}</td><td>${pole}</td><td>${cRight}</td>`;
                                });
                                    
                            // Vérifier si des résultats ont été trouvés
                            if (concordance.length === 0) {
                                // Effacer les résulats précédent
                                document.getElementById('page-analysis').innerHTML = "";
                                // Afficher un message d'erreur
                                document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée pour: " + poleInput;
                                } else {
                                    // Effacer tout message d'erreur précédent
                                    document.getElementById('logger3').innerHTML = "";
                                    // Injecter le tableau résultant dans l'élément HTML
                                    document.getElementById("page-analysis").innerHTML = "";
                                    document.getElementById("page-analysis").appendChild(table); 
                                    }
                        }
                }
        }
}
// Mots les plus longs ----------------------------------------------
function tokenLong() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        // Trier par longueur décroissante et garder les 10 premiers
        let tokenSort = global_var_tokens.sort((a, b) => b.length - a.length).slice(0, 10);
        
        // Créer les lignes du tableau
        let map = tokenSort.map(token => 
            '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>'
        ).join('');
        
        // Construire le tableau HTML complet
        let resultat = '<table class="long-words-table"><tr><th colspan=2><b>10 mots les plus longs</b></th></tr>' +
                       '<tr><th><b>Mot</b></th><th><b>Longueur</b></th></tr>' + 
                       map + '</table>';
        
        // Afficher le résultat
        document.getElementById('page-analysis').innerHTML = resultat;
    }
}

// Pie Chart (mots les plus fréquents, moins les stopwords) --------------------------------------------------
function pieChart() {
	if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";

        // Récupérer les stopwords
	    var stopwordInput = document.getElementById('stopwordID').value;
	    var stopwords = stopwordInput.split(",");

	    // Filtrer les stopwords de global_var_tokens
	    var filteredTokens = global_var_tokens.filter(function(token) {
	      return stopwords.indexOf(token) === -1;
	    });

	    // Compter le nombre d'occurences de chaque token dans "filteredTokens"
	    var count = {};
	    filteredTokens.forEach(function(token) {
	      count[token] = (count[token] || 0) + 1;
	    });

	    var chartData = [];
	    var sortedTokens = Object.keys(count).sort(function(a, b) { // on creer un tableau qui recupere tous les mots et on trie grace a sort
	      return count[b] - count[a];
	    }).slice(0, 30); // on garde que les 30 premiers
	    sortedTokens.forEach(function(token) {
	      chartData.push({ // on ajoute chaque mot dans le tableau
	        label: token,// le mot
	        y: count[token] // nombre de fois du mot
	      });
	    });

	    // Création du graphique CanvasJS
	    var chart = new CanvasJS.Chart("chartContainer", {
	      animationEnabled: true,
	      backgroundColor: "transparent",
	      title: {
	        text: "Mots les plus fréquents"
	      },
	      data: [{
	        type: "pie", // gracphique en camenbert 
	        showInLegend: true, // on affiche la legende
	        legendText: "{label}", // on affiche les mots
	        indexLabelFontSize: 14, //tailled e la police
	        indexLabel: "{label} - {y}", 
	        dataPoints: chartData // les mots qu'on a recuperer plus haut
	      }]
	    });

	    chart.render(); // on affiche le graphique
    }
}

// kujuj() rajoute "uj" à chaque token 
function kujuj() {
    alert("C'est une plaisanterie !"); // affiche une alerte popup
    
    if (global_var_tokens && global_var_tokens.length > 0) { // verifie que le tableau de tokens existe et n'est pas vide
        document.getElementById('fileDisplayArea').textContent =  // ajoute "uj" à chaque token et affiche le résultat dans la zone de texte
            global_var_tokens.map(token => token + "uj").join(" ");
    }
}

// Noms propres -------------------------------------------------
function noms_propres() {  // Vérifie si tokens  disponible
    if (!global_var_tokens) return; 
    
    let mots = global_var_tokens.filter(t => t[0] === t[0].toUpperCase() && t[0] !== t[0].toLowerCase());   // Filtrer les mots qui commencent par une majuscule (car les noms propre commen par une majiuscule)
    let result = [...new Set(mots)].join(", "); // on enleve les doublons et con separe par des virgules
    
    document.getElementById('page-analysis').innerHTML = result || "Aucun nom propre trouvé"; // on affiche
}

// Nombre de phrases -----------------------------------------
function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let text = document.getElementById("fileDisplayArea").textContent; // recuperer du texte
        let phrase = /[.!?]+/g; // detecter les fins de phrases
        let nbPhrases = text.split(phrase); // découpage
        let resultat = nbPhrases.length;
        document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + resultat + ' phrases dans ce texte.</div>';
    }
}
