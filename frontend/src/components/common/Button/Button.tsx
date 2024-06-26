import { ButtonProps, ButtonUIType, StyledButtonProps } from '@app/components/common/Button/Button.interface';
import {
  BorderButton,
  BorderlessButton,
  getButtonColors,
  LinkButton,
  SolidButton,
} from '@app/components/common/Button/Button.styles';
import { useTheme } from 'styled-components';

const getButtonComponent = (type?: (typeof ButtonUIType)[keyof typeof ButtonUIType]): React.FC<StyledButtonProps> => {
  switch (type) {
    case ButtonUIType.BORDER:
      return BorderButton;
    case ButtonUIType.BORDERLESS:
      return BorderlessButton;
    case ButtonUIType.LINK:
      return LinkButton;
    case ButtonUIType.SOLID:
    default:
      return SolidButton;
  }
};

export const Button: React.FC<ButtonProps> = ({
  buttonColor,
  disabled,
  title,
  leftIcon,
  rightIcon,
  uiType,
  ...props
}) => {
  const theme = useTheme();
  const ButtonComponent = getButtonComponent(uiType);
  const buttonColors = getButtonColors(theme, buttonColor);

  return (
    <ButtonComponent disabled={disabled} $darkColor={buttonColors.dark} $lightColor={buttonColors.light} {...props}>
      {leftIcon}
      {title}
      {rightIcon}
    </ButtonComponent>
  );
};
