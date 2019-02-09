const isString = val => typeof val === "string" || val instanceof String;

const isDefined = val => typeof val !== "undefined";

const isValid = val =>
  typeof val !== "undefined" && val !== null ? true : undefined;

const addPoints = (p1, p2) => {
  let result = { ...p1 };
  Object.keys(p2).forEach(key => {
    if (result.hasOwnProperty(key)) {
      result[key] += p2[key];
    } else {
      result[key] = p2[key];
    }
  });
  return result;
};

export { isString, isDefined, isValid, addPoints };
