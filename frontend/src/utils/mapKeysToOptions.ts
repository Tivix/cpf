import { Option } from '@app/types/common';
import { capitalize } from './capitalize';

export const mapKeysToOptions = (keys: string[]): Option[] =>
  keys.map((key) => ({
    id: key,
    name: capitalize(key),
  }));
