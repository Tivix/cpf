import StyledComponentsRegistry from './lib/registry';
import {ReactNode} from "react";

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
      <html>
      <body>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      </html>
  );
}
