import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export const generateClassNames = (...classes: ClassValue[]) => twMerge(clsx(classes));
