const isSameCaracter = (value: string) => /^(\d)\1+$/.test(value);

const isOnlyDigits = (value: string) => /^\d+/.test(value);

const normalizeString = (data: string) =>
  data
    .normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, '');

export { isSameCaracter, isOnlyDigits, normalizeString };
