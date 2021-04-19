export default function generatePassword(settings) {
    let lettersSetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let symbolsSetArray = [ "=","+","-","^","?","!","%","&","*","$","#","^","@","|"];
    let passwordArray = [];
    let digitsPositionArray = [];

    for (let i = 0; i < settings.length; i++) {
        digitsPositionArray.push(i);
        let upperCase = Math.round(Math.random() * 1);
        if (upperCase === 0) {
            passwordArray[i] = lettersSetArray[Math.floor(Math.random()*lettersSetArray.length)].toUpperCase();
        } else {
            passwordArray[i] = lettersSetArray[Math.floor(Math.random()*lettersSetArray.length)];
        }
    }

    for (let i = 0; i < settings.digits; i++) {
        let digit = Math.round(Math.random() * 9);
        let numberIndex = digitsPositionArray[Math.floor(Math.random() * digitsPositionArray.length)];

        passwordArray[numberIndex] = digit;
        let j = digitsPositionArray.indexOf(numberIndex);
        if (i != -1) {
            digitsPositionArray.splice(j, 1);
        }
    }

    for (let i = 0; i < settings.symbols; i++) {
        let symbol = symbolsSetArray[Math.floor(Math.random() * symbolsSetArray.length)];
        let symbolIndex = digitsPositionArray[Math.floor(Math.random() * digitsPositionArray.length)];

        passwordArray[symbolIndex] = symbol;
        let j = digitsPositionArray.indexOf(symbolIndex);
        if (i != -1) {
            digitsPositionArray.splice(j, 1);
        }
    }

    return passwordArray.join("");
}
