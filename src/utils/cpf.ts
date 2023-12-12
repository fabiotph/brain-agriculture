import { isOnlyDigits, isSameDigits } from "./string";

const isValidCPF = (cpf: string) => {
  const error = () => {
    throw Error("CPF is invalid");
  };

  if (cpf.length !== 11 || !isOnlyDigits(cpf) || isSameDigits(cpf)) error();

  const isValidNumValidator = (sum: number, numValidator: number) => {
    const checkValidator = sum % 11;
    if (checkValidator < 2) {
      if (numValidator !== 0) error();
    } else if (11 - checkValidator !== numValidator) error();

    return true;
  };

  const digitsWithValidators = cpf.split("").map((x: string) => parseInt(x));
  const digits = digitsWithValidators.slice(0, 9);
  const validators = digitsWithValidators.slice(9, 11);

  let [sum1, sum2] = digits.reduce(
    (prev, curr, idx) => {
      return [prev[0] + curr * (10 - idx), prev[1] + curr * (11 - idx)];
    },
    [0, 0]
  );

  if (!isValidNumValidator(sum1, validators[0])) error();

  sum2 += validators[0] * 2;

  return isValidNumValidator(sum2, validators[1]);
};

export { isValidCPF };
