import 'styled-components';
import { theme } from '@app/styles/theme';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
