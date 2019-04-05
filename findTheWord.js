let words = ['bateau', 'avion', 'banane', 'fleur', 'fourchette', 'dentifrice', 'nuage', 'plante', 'verre', 'trousse', 'cahier', 'disjoncteur', 'porte-avion', 'sous-marin', 'village', 'cantine', 'amoureux', 'xylophone', 'trompette', 'couteau', 'voiture', 'crayon', 'pyjama', 'chlore', 'capsule', 'jambon', 'cheval', 'étourdi', 'vaisseau', 'dinosaure', 'assiette', 'ordinateur',
    'voyage', 'lion', 'serpent', 'cousin', 'poison', 'avocat', 'table', 'école', 'collège', 'téléphone', 'musique', 'alphabet',
    'clavier', 'arbre', 'jardin', 'voyageur', 'tabouret', 'ananas', 'pamplemousse', 'citron', 'canapé', 'robot', 'mystère', 'toilettes',
    'garage', 'virgule', 'aventure', 'chemin', 'filet', 'vache', 'tigre', 'rat', 'bol', 'cuillère', 'chaussures', 'pantalon', 'veste', 'vaste',
    'ouest', 'wagon', 'caravane', 'saxophone', 'guitare', 'violon', 'piano', 'piscine', 'grand-père', 'frère', 'soeur', 'papillon',
    'camion', 'continent', 'océan', 'montagne', 'écran', 'vasque', 'évier', 'meuble', 'robinet', 'professeur', 'astronaute', 'cosmonaute',
    'fusée', 'ballon', 'élastique', 'sable', 'cailloux', 'sucre', 'farine', 'avoine', 'herbe', 'faon', 'cerf', 'requin', 'dauphin', 'baleine','éléphant','menteur','jupe','télévision','volcan','ordinateur','oignon','singe','autruche','girafe',
'manga','montre','hibou','bijoux','détails','clés','écoliers','patisserie','médaille','vainqueur','vaillant','tableau','chien',
'puma','couleur','cheveux','football','pieds','mains','télécommande','rhinocéros','palmier','manteau','mots','thé','café','peinture','amplificateur','stade','joyeux','sapin','princesse','saleté','lettre','vitre','calculatrice','rideau','bouche','front','jambe','nez','terre','soleil','campagne','terrible','nuageux','terreur','ampoule','chocolat','amande','pédale','volant',
'vitesse','clignotant','roues','loin','après','avant','lune','dorénavant','équerre','échelle','technologie','mathématiques',
'géographie','planisphère','tuilles','tuyau','croissant','chocolatine','beurre','balai','mobile','ornithorynque','kangourou',
'classeur','carton','tube','pelouse','aventurier','guerrier','général','armée'];

let totalWords = words.length;
console.log('nombre total de mots', totalWords);

let wordToFind = words[Math.floor(Math.random() * totalWords)];
console.log(wordToFind);

let score = 0;
let hasFindWordCount = 0;

let play = document.getElementById('play');
let tryCount = document.getElementById('tryCount');
let scoreView = document.getElementById('scoreView');
let caseDiv = document.getElementById('caseDiv');

createCases();

play.addEventListener('click', playGame, true);

function playGame(e) {
    let result = document.getElementById('result').value.toLowerCase();
    if (result == wordToFind) {
        hasFindWordCount++;
        showSuccess();
        beepFindWord();
        showLetters(wordToFind, result);
        setTimeout(removeCases,3000);
        wordToFind = newWord();
        setTimeout(createCases,3000);
        console.log('nouveau mot', wordToFind);
        resetViewInput();
    } else {
        score++;
        resetViewInput();
        showLetters(wordToFind, result);
        showScore();
    }
}

function newWord() {
    return words[Math.floor(Math.random() * totalWords) + 1];
}

function showSuccess() {
    return scoreView.innerHTML = `Le mot <em>${wordToFind.toUpperCase()}</em> a été trouvé le score est de ${score} points <br>Le nombre de mot trouvé est ${hasFindWordCount}<br>Trouve le mot suivant`;
}

function showScore() {
    return score > 1 ? scoreView.innerHTML = `Le score est de ${score} points<br>Le nombre de mot trouvé est ${hasFindWordCount}` : scoreView.innerHTML = `Le score est de ${score} point<br>Le nombre de mot trouvé est ${hasFindWordCount}`;
}

function resetViewInput() {
    document.getElementById('result').value = '';
}

function howManyLetters() {
    let howManyLetters = wordToFind.length;
    return howManyLetters;
}

function createCases() {
    let numberOfCases = howManyLetters();
    for (let i = 0; i < numberOfCases; i++) {
        let cases = document.createElement('div');
        caseDiv.appendChild(cases);
    }
}

function removeCases() {
        while(caseDiv.hasChildNodes() ){
            caseDiv.removeChild(caseDiv.lastChild);
        }
}

function showLetters(wordToFind, result) {
    let numberOfLetters = howManyLetters();
    for (let i = 0; i < numberOfLetters; i++) {
        if (wordToFind[i] == result[i]) {
            let letter = document.querySelectorAll('#caseDiv div')[i];
            if (letter.textContent == '') {
            letter.textContent = wordToFind[i].toUpperCase();
            letter.classList.add('find');
            beepSuccess();
            }
        }
    }
}

function help() {
    let numberOfLetters = howManyLetters();
    let helpLetter = wordToFind[Math.floor(Math.random() * numberOfLetters)];
    let insertLetter = document.querySelectorAll('#caseDiv div')[wordToFind.indexOf(helpLetter)];
    if (insertLetter.textContent == '') {
    insertLetter.textContent = helpLetter.toLocaleUpperCase();
    insertLetter.classList.add('help');
    } else if (insertLetter.classList.contains('help')) {
        insertLetter.textContent = '';
        insertLetter.classList.remove('help');
    } 
    score++;
    beepHelp();
    showScore();
}

function beepSuccess() {
    let beep = new Audio();
    beep.src="beep-success.mp3";
    beep.play();
}

function beepHelp() {
    let beep = new Audio();
    beep.src="beep-help.mp3";
    beep.play();
}

function beepFindWord() {
    let beep = new Audio();
    beep.src="beep-find-word.mp3";
    beep.play();
}
