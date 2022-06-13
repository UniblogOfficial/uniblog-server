/* eslint-disable @typescript-eslint/ban-types */
export const getKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;
export const getValues = <T extends Object>(obj: T) => getKeys(obj).map(key => obj[key]);
