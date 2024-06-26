type UnknownObject = { [key: string]: unknown };

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = function (a: unknown) {
  return Array.isArray(a);
};

const isObject = function (o: unknown) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const mapKeysToCamelCase = <T>(o: T): T extends Array<infer U> ? U[] : UnknownObject => {
  if (isObject(o)) {
    const n: UnknownObject = {};

    Object.keys(o as UnknownObject).forEach((k) => {
      n[toCamel(k)] = mapKeysToCamelCase((o as UnknownObject)[k]);
    });

    return n as T extends Array<infer U> ? U[] : UnknownObject;
  } else if (isArray(o)) {
    return (o as unknown[]).map((i) => mapKeysToCamelCase(i)) as T extends Array<infer U> ? U[] : UnknownObject;
  }

  return o as T extends Array<infer U> ? U[] : UnknownObject;
};
