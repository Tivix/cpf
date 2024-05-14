import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {authOptions} from "@app/app/api/auth/[...nextauth]/route";
import LoginLink from "@app/components/common/LoginLink";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/library');
  }

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <LoginLink session={session} />
      </div>
  );
}
