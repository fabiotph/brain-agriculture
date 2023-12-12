import { isOnlyDigits, isSameDigits, normalizeString } from "..";

describe("string tests", () => {
  describe("isSameDigits tests", () => {
    it("should string must have all the same digits", () => {
      const sameCaracters = [
        "111",
        "2222",
        "33",
        "444444",
        "5555555",
        "66",
        "77777",
        "8888888888",
        "9999",
      ];
      sameCaracters.forEach((value) => {
        const isValid = isSameDigits(value);
        expect(isValid).toBe(true);
      });
    });

    it("should string must not have all the same digits", () => {
      const sameCaracters = [
        "112",
        "22220",
        "331",
        "4444442",
        "55555554",
        "661",
        "777377",
        "88888188888",
        "99899",
      ];
      sameCaracters.forEach((value) => {
        const isValid = isSameDigits(value);
        expect(isValid).not.toBe(true);
      });
    });
  });
  describe("isOnlyDigits tests", () => {
    it("should string must have only digits", () => {
      const onlyDigits = [
        "1231231231666",
        "0681",
        "123",
        "1",
        "12341806785",
        "12546",
        "98",
        "0",
      ];
      onlyDigits.forEach((onlyDigit) => {
        const isValid = isOnlyDigits(onlyDigit);
        expect(isValid).toBe(true);
      });
    });

    it("should string must not have only digits", () => {
      const onlyDigits = [
        "123a",
        "06ç81",
        "b123",
        "1-",
        "1234@1806785",
        "1254,6",
        "98%",
        "$0",
      ];
      onlyDigits.forEach((onlyDigit) => {
        const isValid = isOnlyDigits(onlyDigit);
        expect(isValid).not.toBe(true);
      });
    });
  });

  describe("normalizeString tests", () => {
    it("should normalize string correctly", () => {
      const stringNotHandled = ["áç1", "FA1ô", "àB$"];
      const stringHandled = ["ac1", "fa1o", "ab$"];

      stringNotHandled.forEach((str, idx) => {
        const isValid = normalizeString(str);
        expect(isValid).toBe(stringHandled[idx]);
      });
    });
  });
});
