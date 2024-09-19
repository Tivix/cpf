'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@app/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { routes } from '@app/constants';
import {
  AddEmployeeForm,
  addEmployeeFormNames,
} from '@app/components/pages/People/addEmployee/AddEmployeeFormProvider';
import { userStatus } from '@app/types/user';

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
  const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_SERVER_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.admin.createUser({
    email: data['email'],
    email_confirm: true,
    password: data['password'],
    user_metadata: {
    first_name: 'First Name',
    last_name: 'Last Name'
    },
  });
  if (error) {
    redirect('/error');
  }


  revalidatePath('/');
  redirect('/');
}

export async function createEmployee(data: AddEmployeeForm & { status: keyof typeof userStatus }) {
  const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_SERVER_URL!, process.env.SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const technologies =
    data[addEmployeeFormNames.technology]?.length > 0
      ? data[addEmployeeFormNames.technology].map((tech) => tech.name)
      : null;

  const userMeta = {
    first_name: data[addEmployeeFormNames.firstName],
    last_name: data[addEmployeeFormNames.lastName],
    ladder_slug: data[addEmployeeFormNames.ladder].id,
    technologies,
  };

  const { error } = await supabase.auth.admin.createUser({
    email: data[addEmployeeFormNames.email],
    email_confirm: true,
    password: 'password',
    user_metadata: {
      ...userMeta,
      status: data.status,
    },
  });

  const message = error ? error?.message || 'Something went wrong, try again later' : null;

  revalidatePath(routes.people.index);
  return message;
}
