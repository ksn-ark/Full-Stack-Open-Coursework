import { EntryType, entryTypes, Gender, HealthCheckRating } from '../types';

export const isObj = (value: unknown): value is object =>
  typeof value === 'object';

export const isObjKey = <T>(key: keyof T, obj: object): key is keyof object =>
  key in obj;

export const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

export const isDate = (value: unknown): value is string =>
  isString(value) && Boolean(Date.parse(value));

export const isEntryType = (value: unknown): value is EntryType => {
  return isString(value) && entryTypes.has(value);
};

export const isHealthCheckRating = (
  value: unknown
): value is HealthCheckRating =>
  Boolean(Object.values(HealthCheckRating).find((v) => v === Number(value)));

export const isGender = (value: unknown): value is Gender =>
  isString(value) &&
  Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
