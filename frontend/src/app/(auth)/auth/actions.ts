'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@app/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();

  // const response = await fetch('http://proxy/auth/v1/token', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //   }),
  // })

  // const foo = await response.json()

  // console.log('data', foo)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('err', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log('data', data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log('err', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
