import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {authOptions} from "@app/app/auth/[...nextauth]/route";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <h1>Library</h1>;
}
