import { ButtonColor, StyledButtonProps } from '@app/components/common/Button/Button.interface';
import styled, { css } from 'styled-components';
import { Theme } from '@app/types/styled';

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
`;

export const SolidButton = styled(Button)<StyledButtonProps>`
  ${({ $lightColor, $darkColor, disabled, theme }) =>
    !disabled &&
    css`
      background-color: ${$lightColor};
      color: ${theme.colors.white};
      &:hover,
      &:focus {
        background-color: ${$darkColor};
      }
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.navy['200']};
      color: ${theme.colors.navy['300']};
    `}
`;

export const BorderButton = styled(Button)<StyledButtonProps>`
  ${({ $lightColor, $darkColor, disabled, theme }) =>
    !disabled &&
    css`
      border: solid 1px ${$lightColor};
      color: ${$lightColor};
      &:focus {
        border-color: ${$darkColor};
        color: ${$darkColor};
      }
      &:hover {
        background-color: ${theme.colors.navy['100']};
      }
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      border: solid 1px ${theme.colors.navy['200']};
      color: ${theme.colors.navy['300']};
    `}
`;

export const BorderlessButton = styled(Button)<StyledButtonProps>`
  ${({ disabled, $darkColor, $lightColor, theme }) =>
    !disabled &&
    css`
      color: ${$lightColor};
      &:focus {
        color: ${$darkColor};
      }
      &:hover {
        background-color: ${theme.colors.navy['100']};
      }
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.navy['300']};
    `}
`;

export const LinkButton = styled(Button)<StyledButtonProps>`
  ${({ $lightColor, $darkColor, disabled }) =>
    !disabled &&
    css`
      color: ${$lightColor};
      &:hover,
      &:focus {
        color: ${$darkColor};
      }
      &:hover {
        text-decoration-line: underline;
      }
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.navy['300']};
    `}
`;

export const getButtonColors = (theme: Theme, color?: (typeof ButtonColor)[keyof typeof ButtonColor]) => {
  switch (color) {
    case ButtonColor.NAVY:
      return {
        light: theme.colors.navy['600'],
        dark: theme.colors.navy['700'],
      };
    case ButtonColor.RED:
      return {
        light: theme.colors.red['600'],
        dark: theme.colors.navy['700'],
      };
    case ButtonColor.BLUE:
    default:
      return {
        light: theme.colors.navy['800'],
        dark: theme.colors.navy['900'],
      };
  }
};
