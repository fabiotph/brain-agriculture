import { isValidState } from "..";

describe("state tests", () => {
  it("should states with uppercase be valid", () => {
    const states = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ];
    states.forEach((state) => {
      const isValid = isValidState(state);
      expect(isValid).toBe(true);
    });
  });

  it("should states with lowercase be valid", () => {
    const states = [
      "ac",
      "al",
      "ap",
      "am",
      "ba",
      "ce",
      "df",
      "es",
      "go",
      "ma",
      "mt",
      "ms",
      "mg",
      "pa",
      "pb",
      "pr",
      "pe",
      "pi",
      "rj",
      "rn",
      "rs",
      "ro",
      "rr",
      "sc",
      "sp",
      "se",
      "to",
    ];
    states.forEach((state) => {
      const isValid = isValidState(state);
      expect(isValid).toBe(true);
    });
  });

  it("should states not be valid", () => {
    const states = ["BR", "JO", "JA", "RM"];
    states.forEach((state) => {
      const fnToThrow = () => isValidState(state);
      expect(fnToThrow).toThrow();
    });
  });
});
