exports.validCNPJ = (cnpj) => {
    if (!cnpj) {
        return true;
    }

    cnpj = cnpj.toString().replace(/\D+/g, '');
    // tslint:disable-next-line:one-variable-per-declaration
    let numbers, digits, sum, i, result, pos, length, equalsDigits;
    equalsDigits = 1;
    if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
    }

    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) !== cnpj.charAt(i + 1)) {
            equalsDigits = 0;
            break;
        }
    }

    if (!equalsDigits) {
        length = cnpj.length - 2;
        numbers = cnpj.substring(0, length);
        digits = cnpj.substring(length);
        sum = 0;
        pos = length - 7;

        for (i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0)) {
            return false;
        }

        length = length + 1;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        return result == digits.charAt(1);
    } else {
        return false;
    }
}