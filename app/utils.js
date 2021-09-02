// &#9733 = étoile pleine
// &#9734 = étoile vide

const buildStarsString = (note) => {
    let finalString = "";
    i = 0;

    // je boucle entre 0 et 5 (car 5 étoiles max)
    while (i < 5) {
        
        if (i < note) { 
            finalString += '&#9733; ';
        } else { 
            finalString += '&#9734; ';
        }
        
        i++;
    }
    return finalString;
}

// j'exporte un objet, qui contient ma fonction "buildStarsString"
module.exports = {
    buildStarsString,
    // équivalent de : 
    // buildStarsString: buildStarsString,
}