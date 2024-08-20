'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@app/utils/supabase/server';
import { routes } from '@app/constants';
import { AddEmployeeForm, addEmployeeFormNames } from '@app/components/pages/addEmployee/AddEmployeeFormProvider';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/');
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

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/');
  redirect('/');
}

export async function signupEmployee(formData: AddEmployeeForm) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData[addEmployeeFormNames.email],
    password: 'password',
  };

  const { error } = await supabase.auth.signUp(data);
  const message = error ? error?.message || 'Something went wrong, try again later' : null;

  revalidatePath(routes.people.index);
  return message;
}
