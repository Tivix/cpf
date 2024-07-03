import { redirect } from 'next/navigation';
import { routes } from '@app/constants';

export default function Home() {
  redirect(routes.mySpace.index);
}
