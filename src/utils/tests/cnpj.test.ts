import { isValidCNPJ } from "..";

const generateCpfWithSameNumbers = () => {
  const cnpjToGenerate = "XXXXXXXXXXXXXX";
  const cnpjs: string[] = [];

  for (let i = 0; i <= 9; i++)
    cnpjs.push(cnpjToGenerate.replaceAll("X", `${i}`));
  return cnpjs;
};

describe("CNPJ tests", () => {
  it("should CNPJs must be valid", () => {
    const cpfs = [
      "60048663000108",
      "30463985000152",
      "79804455000110",
      "55147103000170",
      "93814235000106",
    ];
    cpfs.forEach((cnpj) => {
      const isValid = isValidCNPJ(cnpj);
      expect(isValid).toBe(true);
    });
  });

  it("should CNPJs must not be valid", () => {
    const cpfs = [
      "76521263422728",
      "28163988213848",
      "56317011231302",
      "46721031778220",
      "80214182819137",
    ];
    cpfs.forEach((cnpj) => {
      const fnToThrow = () => isValidCNPJ(cnpj);
      expect(fnToThrow).toThrow();
    });
  });

  it("CNPJs with the same numbers must not be valid", () => {
    generateCpfWithSameNumbers().forEach((cnpj) => {
      const fnToThrow = () => isValidCNPJ(cnpj);
      expect(fnToThrow).toThrow();
    });
  });
});
