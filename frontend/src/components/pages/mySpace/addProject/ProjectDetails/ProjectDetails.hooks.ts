import { routes } from '@app/constants';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { AddProjectForm, addProjectFormNames } from '../AddProjectFormProvider/AddProjectFormProvider.interface';
import { useMySpaceStore } from '@app/store/mySpace';

export const useProjectDetails = () => {
  const form = useFormContext<AddProjectForm>();
  const updateProgress = useMySpaceStore((state) => state.updateProgress);
  const { isValid } = form.formState;

  const values = form.watch();
  const otherProjectType = values[addProjectFormNames.type].id === 'other';

  // INFO: update progress in sidebar stepper
  useEffect(() => {
    if (isValid) updateProgress({ [routes.mySpace.addNew.projectDetails]: isValid ? 'completed' : 'inProgress' });
  }, [isValid, updateProgress]);

  return { formValid: isValid, otherProjectType };
};
