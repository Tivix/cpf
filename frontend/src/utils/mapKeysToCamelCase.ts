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

export const mapKeysToCamelCase = <T>(o: unknown): T => {
  if (isObject(o)) {
    const n: { [key: string]: keyof T } = {};

    Object.keys(o as { [key: string]: keyof T }).forEach((k) => {
      n[toCamel(k)] = mapKeysToCamelCase((o as { [key: string]: keyof T })[k]);
    });

    return n as T;
  } else if (isArray(o)) {
    return (o as unknown as Array<unknown>).map((i) => mapKeysToCamelCase(i)) as T;
  }

  return o as T;
};
