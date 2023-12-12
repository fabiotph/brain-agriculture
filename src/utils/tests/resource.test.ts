import {
  isValidResource,
  sanitizeAndValidateResources,
} from "..";

describe("resource tests", () => {
  describe("isValidResource tests", () => {
    it("should resources be valid", () => {
      const resources = ["algodao", "cafe", "cana de acucar", "milho", "soja"];
      resources.forEach((resource) => {
        const isValid = isValidResource(resource);
        expect(isValid).toBe(true);
      });
    });

    it("should resources not be valid", () => {
      const resources = ["pao", "leite", "ovo", "queijo", "batata"];
      resources.forEach((resource) => {
        const isValid = isValidResource(resource);
        expect(isValid).not.toBe(true);
      });
    });
  });

  describe("sanitizeAndValidateResources tests", () => {
    it("should resources be valid and sanitize", () => {
      const resourcesNotHandled = [
        "AlGodÃo",
        "cAfé",
        "cana DE acùcAr",
        "MIlHo",
        "SoJa",
      ];
      const resources = ["algodao", "cafe", "cana de acucar", "milho", "soja"];
      const { isValid, data } =
        sanitizeAndValidateResources(resourcesNotHandled);
      expect(isValid).toBe(true);
      expect(data).toStrictEqual(resources);
    });

    it("should resources not be valid, but sanitize data", () => {
      const resourcesNotHandled = [
        "AlGodÃo",
        "cAfé",
        "cana DE acùcAr",
        "MIlHo",
        "oVO",
      ];
      const resources = ["algodao", "cafe", "cana de acucar", "milho", "ovo"];
      const { isValid, data } =
        sanitizeAndValidateResources(resourcesNotHandled);
      expect(isValid).not.toBe(true);
      expect(data).toStrictEqual(resources);
    });
  });
});
