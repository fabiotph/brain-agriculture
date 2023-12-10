import { EResource } from "../types";
import { normalizeString } from "./string";

const isValidResource = (value: string) => {
  return Object.values(EResource).some((resource) => resource === value);
};

const sanitizeAndValidateResources = (values: Array<string>) => {
  return values.reduce(
    (prev: { isValid: boolean; data: string[] }, curr) => {
      const valueHandled = normalizeString(curr);
      const isValid = prev.isValid ? isValidResource(valueHandled) : false;
      return {
        isValid,
        data: [...prev.data, valueHandled],
      };
    },
    { isValid: true, data: [] }
  );
};

export { isValidResource, sanitizeAndValidateResources };
