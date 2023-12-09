import { isOnlyDigits, isSameCaracter } from "./string";

const isValidCNPJ = (cnpj: string) => {
  if (cnpj.length !== 14 || !isOnlyDigits(cnpj) || isSameCaracter(cnpj))
    return false;

  const isValidNumValidator = (sum: number, numValidator: number) => {
    const checkValidator = sum % 11;
    if (checkValidator < 2) {
      if (numValidator !== 0) return false;
    } else if (11 - checkValidator !== numValidator) return false;

    return true;
  };

  const digitsWithValidators = cnpj.split("").map((x: string) => parseInt(x));
  const digits = digitsWithValidators.slice(0, 12);
  const validators = digitsWithValidators.slice(12, 14);

  let [sum1, sum2] = digits.reduce(
    (prev, curr, idx) => {
      const aux1 = (idx < 4 ? 5 : 13) - idx;
      const aux2 = (idx < 5 ? 6 : 14) - idx;
      return [prev[0] + curr * aux1, prev[1] + curr * aux2];
    },
    [0, 0]
  );

  if (!isValidNumValidator(sum1, validators[0])) return false;

  sum2 += validators[0] * 2;

  return isValidNumValidator(sum2, validators[1]);
};

export { isValidCNPJ };
