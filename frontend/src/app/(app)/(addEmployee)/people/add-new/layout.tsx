import { EmployeeSideStepper } from '@app/components/modules/EmployeeSideStepper';
import { EmployeeTopbar } from '@app/components/modules/EmployeeTopbar';
import { AddEmployeeFormProvider } from '@app/components/pages/People/addEmployee/AddEmployeeFormProvider';

export default function PeopleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="w-full">
        <AddEmployeeFormProvider>
          <EmployeeTopbar />
          <main className="p-8">
            <div className="grid grid-cols-workflow">
              <EmployeeSideStepper />
              <div className="col-span-1 px-8">{children}</div>
            </div>
          </main>
        </AddEmployeeFormProvider>
      </div>
    </div>
  );
}
