import { useForm } from 'react-hook-form';
import { NotificationsForm } from './Notifications.interface';

export const useNotifications = () => {
  const form = useForm<NotificationsForm>({
    mode: 'onChange',
    defaultValues: {
      slack: { id: 'slack', selected: true },
      email: { id: 'email', selected: false },
    },
  });
  return { form };
};
