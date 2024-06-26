import { ButtonColor, StyledButtonProps } from '@app/components/common/Button/Button.interface';
import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
`;

export const SolidButton = styled(Button)<StyledButtonProps>`
  ${({ lightColor, darkColor, disabled }) =>
    !disabled &&
    css`
      background-color: ${lightColor};
      color: white;
      &:hover,
      &:focus {
        background-color: ${darkColor};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #e5e6ea;
      color: #c8cbd0;
    `} // navy-200
`;

export const BorderButton = styled(Button)<StyledButtonProps>`
  ${({ lightColor, darkColor, disabled }) =>
    !disabled &&
    css`
      border: solid 1px ${lightColor};
      color: ${lightColor};
      &:focus {
        border-color: ${darkColor};
        color: ${darkColor};
      }
      &:hover {
        background-color: #f2f3f4; // navy-100
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      border: solid 1px #e5e6ea;
      color: #c8cbd0;
    `} // navy-200
`;

export const BorderlessButton = styled(Button)<StyledButtonProps>`
  ${({ disabled, darkColor, lightColor }) =>
    !disabled &&
    css`
      color: ${lightColor};
      &:focus {
        color: ${darkColor};
      }
      &:hover {
        background-color: #f2f3f4; // navy-100
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: #c8cbd0;
    `}
`;

export const LinkButton = styled(Button)<StyledButtonProps>`
  ${({ lightColor, darkColor, disabled }) =>
    !disabled &&
    css`
      color: ${lightColor};
      &:hover,
      &:focus {
        color: ${darkColor};
      }
      &:hover {
        text-decoration-line: underline;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: #c8cbd0;
    `}
`;

export const getButtonColors = (color?: ButtonColor) => {
  switch (color) {
    case 'navy':
      return {
        light: '#555C6B',
        dark: '#3C4455',
      };
    case 'red':
      return {
        light: '#DC2626',
        dark: '#BA1919',
      };
    case 'blue':
    default:
      return {
        light: '#4B69C9',
        dark: '#354FA0',
      };
  }
};
