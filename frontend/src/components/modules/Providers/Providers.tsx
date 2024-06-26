'use client';

import StyledComponentsRegistry from '@app/styles/registry';
import { ThemeProvider } from 'styled-components';
import { theme } from '@app/styles/theme';

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};
