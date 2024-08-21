'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@app/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
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

export async function createEmployee(formData: AddEmployeeForm) {
  const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_SERVER_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const { error } = await supabase.auth.admin.createUser({
    email: formData[addEmployeeFormNames.email],
    email_confirm: true,
    password: 'password',
    user_metadata: {
      first_name: formData[addEmployeeFormNames.firstName],
      last_name: formData[addEmployeeFormNames.lastName],
    },
  });

  const message = error ? error?.message || 'Something went wrong, try again later' : null;

  revalidatePath(routes.people.index);
  return message;
}
