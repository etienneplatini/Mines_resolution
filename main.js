const NOMBREDISQUES = 3;
const NOMBRETOURS = 3;

let tour1 = [-1,0,1];
let tour2 = [-1];
let tour3 = [-1];
let etat = [tour1, tour2, tour3];
let i;
let visite = [];


function testVisite(etatTeste){
    let codeEtat = "";
    for(i=0; i<NOMBRETOURS; i++){
        for(j=0; j <= etatTeste[i].length -1; j++){
            codeEtat += etatTeste[i][j] + "";
        }
    }
    for(i=0; i<=visite.length-1; i++){
        if(visite[i] == codeEtat){
            return true;
        }
    }
    visite.push(codeEtat);
    return false;
}

// Fonction pour faire des copies profondes
function clone(obj){
    try{
        var copy = JSON.parse(JSON.stringify(obj));
    } catch(ex){
        console.log("Vous utilisez un compilateur / navigateur super vieux");
    }
    return copy;
}

function eval(etatTeste, visite){
    let i;
    for(i=0; i < NOMBREDISQUES; i++){
        // On vérifie si les disques sont dans l'ordre; si oui il seront dans le même ordre que le compteur i
        // Attention : toujours -1 en premier disque
        if(etatTeste[NOMBRETOURS-1][i] != i-1){
            return false;
            // N'est pas solution
        }
    }
    // OIZJDOIZDHIUZHOIJPZIIFUYGIHOUDRYYFYGHIOGYFTDRTFHUIOGFTDRTYUGIHOIFDRTYUIHOHFTDRTYGUHIHUDRTSYGUHOIFTDRTYGUHIOYDRTSRYGIUHOIDRYTFU
    if(visite.length <= ((Math.pow(2, NOMBREDISQUES)))){
        return true;
    }
    return false;
};

transform = function(tabEtats){
    tabEtats.forEach(function(etat) {
        if(testVisite(etat)){
            return 0;
        }
        if(eval(etat, visite)){
            console.log(etat, visite);
            console.log(visite);
            console.log("We did it reddit")
        }
        let tabEtatsPossibles = [];
        // Contient 3 tours
        let i;
        let j;
        let tabRpz = [];
        // Construit un tableau contenant uniquement les derniers disques ou null si pas de disque
        for(i=0; i < NOMBRETOURS; i++){
            // Tableau a 2 dimensions : tourX[], et les disques dans chaque tour
            tabRpz[i] = etat[i][etat[i].length - 1];
        }

        // On examine quels disques peuvent bouger et où pour prédire les états
        for(i=0; i < NOMBRETOURS; i++){
            // Si la tour qu'on examine n'est pas vide
            if(tabRpz[i] != -1){
                // On boucle parmis les destinations possibles
                j=0;
                while(j < NOMBRETOURS){
                    let etatPossible = clone(etat);
                    // Si i=j cela signifie qu'il n'y aurait aucun déplacement
                    if(i != j){
                        // Si l'int du disque de la tour qu'on examine est supérieur (le disqque est plus petit)
                        // a celui de la tour sur laquelle on veut le deplacer, alors c'est une possibilité
                        // donc on deplace pour test
                        if(tabRpz[i] > tabRpz[j]){
                             etatPossible[j][etat[j].length] = etat[i][etat[i].length - 1];
                             etatPossible[i].pop();

                             tabEtatsPossibles.push(etatPossible);
                        }
                    }
                    j++;
                }
            }
        }
        console.log(tabEtatsPossibles);
        console.log("---------");
        transform(tabEtatsPossibles);
    });
};

// Main :)
tabEtats = [etat];
transform(tabEtats);







