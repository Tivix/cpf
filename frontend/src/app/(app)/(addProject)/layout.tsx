import { ProjectSideStepper } from '@app/components/modules/ProjectSideStepper';
import { ProjectTopbar } from '@app/components/modules/ProjectTopbar';
import { AddProjectFormProvider } from '@app/components/pages/mySpace/addProject/AddProjectFormProvider';

export default function MySpaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="w-full">
        <AddProjectFormProvider>
          <ProjectTopbar />
          <main className="p-8">
            <div className="grid grid-cols-workflow">
              <ProjectSideStepper />
              <div className="col-span-1 px-8">{children}</div>
            </div>
          </main>
        </AddProjectFormProvider>
      </div>
    </div>
  );
}
