import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@app/app/api/auth/[...nextauth]/route';
import { LoginButton } from '@app/components/modules/LoginButton';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/library');
  }

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <LoginButton session={session} />
    </div>
  );
}
