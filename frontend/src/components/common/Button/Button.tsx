import { ButtonProps, ButtonUIType, StyledButtonProps } from '@app/components/common/Button/Button.interface';
import {
  BorderButton,
  BorderlessButton,
  getButtonColors,
  LinkButton,
  SolidButton,
} from '@app/components/common/Button/Button.styles';

const getButtonComponent = (type?: ButtonUIType): React.FC<StyledButtonProps> => {
  switch (type) {
    case 'border':
      return BorderButton;
    case 'borderless':
      return BorderlessButton;
    case 'link':
      return LinkButton;
    case 'solid':
    default:
      return SolidButton;
  }
};

export const Button: React.FC<ButtonProps> = ({ color, disabled, title, leftIcon, rightIcon, uiType, ...props }) => {
  const ButtonComponent = getButtonComponent(uiType);
  const buttonColors = getButtonColors(color);

  return (
    <ButtonComponent disabled={disabled} $darkColor={buttonColors.dark} $lightColor={buttonColors.light} {...props}>
      {leftIcon}
      {title}
      {rightIcon}
    </ButtonComponent>
  );
};
