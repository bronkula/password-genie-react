export default function calculateStrength(password) {
    let count = {
        excess: 0,
        upperCase: 0,
        numbers: 0,
        symbols: 0
    };

    let weight = {
        excess: 3,
        upperCase: 4,
        numbers: 5,
        symbols: 5,
        combo: 0,
        flatLower: 0,
        flatNumber: 0
    };

    let strength = {
        text: '',
        score: 0
    };

    let baseScore = 30;

    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i).match(/[A-Z]/g)) {
            count.upperCase++;
        }
        if (password.charAt(i).match(/[0-9]/g)) {
            count.numbers++;
        }
        if (password.charAt(i).match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            count.symbols++;
        }
    }

    count.excess = password.length - 6;

    if (count.upperCase && count.numbers && count.symbols) {
        weight.combo = 25;
    } else if (
        (count.upperCase && count.numbers) ||
        (count.upperCase && count.symbols) ||
        (count.numbers && count.symbols)
    ) {
        weight.combo = 15;
    }

    if (password.match(/^[\sa-z]+$/)) {
        weight.flatLower = -30;
    }

    if (password.match(/^[\s0-9]+$/)) {
        weight.flatNumber = -50;
    }

    let score =
            baseScore +
            (count.excess * weight.excess) +
            (count.upperCase * weight.upperCase) +
            (count.numbers * weight.numbers) +
            (count.symbols * weight.symbols) +
            weight.combo + weight.flatLower +
            weight.flatNumber;

    if (score < 30) {
        strength.text = 'weak';
        strength.score = 10;
    } else if (score >= 30 && score < 75) {
        strength.text = 'average';
        strength.score = 40;
    } else if (score >= 75 && score < 150) {
        strength.text = 'strong';
        strength.score = 75;
    } else {
        strength.text = 'secure';
        strength.score = 100;
    }

    return strength;
};
