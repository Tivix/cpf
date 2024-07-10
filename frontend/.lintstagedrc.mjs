import { ESLint } from 'eslint';

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

export default {
  './src/**/*.{js,cjs,mjs,jsx,ts,tsx,json,md,yml}': async (files) => {
    const match = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${match}`, `prettier --write ${match}`];
  },
  './**/*.{json,md,yml}': ['prettier --write'],
  'package.json': 'npx sort-package-json',
};
