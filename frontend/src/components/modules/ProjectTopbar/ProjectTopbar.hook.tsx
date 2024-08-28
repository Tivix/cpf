import { createEmployee } from '@app/actions/user';
import {
  AddEmployeeForm,
  addEmployeeFormNames,
} from '@app/components/pages/People/addEmployee/AddEmployeeFormProvider';
import { routes } from '@app/constants';
import { usePeopleStore } from '@app/store/people';
import { userStatus } from '@app/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useProjectTopbar = () => {
  // const form = useFormContext<AddEmployeeForm>();
  // const router = useRouter();
  // const [cancelModalOpen, setCancelModalOpen] = useState(false);
  // const resetPeopleState = usePeopleStore((state) => state.reset);
  // const { isDirty, isValid, dirtyFields, errors } = form.formState;
  // const handleBack = () => {
  //   router.push(routes.people.index);
  //   form.reset();
  //   resetPeopleState();
  // };
  // const emailValid = addEmployeeFormNames.email in dirtyFields && !(addEmployeeFormNames.email in errors);
  // const formValid = isDirty && isValid;
  // const handleSaveAsDraft = async () => {
  //   const values = form.getValues();
  //   const error = await createEmployee({ ...values, status: userStatus.draft });
  //   if (error) {
  //     toast.error(error);
  //     return;
  //   }
  //   router.push(routes.people.index);
  //   toast.success('Employee saved sa draft!');
  //   form.reset();
  //   resetPeopleState();
  // };
  // return {
  //   cancelModalOpen,
  //   setCancelModalOpen,
  //   isDirty,
  //   handleBack,
  //   formValid,
  //   isSubmitting: form.formState.isSubmitting,
  //   handleSaveAsDraft,
  //   emailValid,
  // };
};
