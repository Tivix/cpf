import styled, { css } from 'styled-components';

const FONT_SIZE_BREAKPOINT = 72;

export const Wrapper = styled.div<{ size: string }>`
  font-size: 1.5rem;

  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
    
    ${
      parseInt(size) < FONT_SIZE_BREAKPOINT &&
      css`
        font-size: 1rem;
      `
    }}
  `}
`;
