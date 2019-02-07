const isString = val => typeof val === "string" || val instanceof String;

const isDefined = val => typeof val !== "undefined";

const isValid = val =>
  typeof val !== "undefined" && val !== null ? true : undefined;

export { isString, isDefined, isValid };
