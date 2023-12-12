import { isValidCPF } from "..";

const generateCpfWithSameNumbers = () => {
  const cpfToGenerate = "XXXXXXXXXXX";
  const cpfs: string[] = [];

  for (let i = 0; i <= 9; i++) cpfs.push(cpfToGenerate.replaceAll("X", `${i}`));
  return cpfs;
};

describe("CPF tests", () => {
  it("should CPFs must be valid", () => {
    const cpfs = [
      "30024684015",
      "03260586059",
      "36663850016",
      "90778071014",
      "31595648003",
    ];
    cpfs.forEach((cpf) => {
      const isValid = isValidCPF(cpf);
      expect(isValid).toBe(true);
    });
  });

  it("should CPFs must not be valid", () => {
    const cpfs = [
      "41224684026",
      "68061582712",
      "84162870216",
      "04419136023",
      "21785621551",
    ];
    cpfs.forEach((cpf) => {
      const fnToThrow = () => isValidCPF(cpf);
      expect(fnToThrow).toThrow();
    });
  });

  it("CPFs with the same numbers must not be valid", () => {
    generateCpfWithSameNumbers().forEach((cpf) => {
      const fnToThrow = () => isValidCPF(cpf);
      expect(fnToThrow).toThrow();
    });
  });
});
