import { ButtonProps } from '@app/components/common/Button/Button.interface';

export const Button: React.FC<ButtonProps> = ({
  buttonColor,
  disabled,
  title,
  leftIcon,
  rightIcon,
  uiType,
  ...props
}) => {
  return (
    <button disabled={disabled} {...props}>
      {leftIcon}
      {title}
      {rightIcon}
    </button>
  );
};
