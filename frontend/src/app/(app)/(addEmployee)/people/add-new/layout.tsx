import { EmployeeSideStepper } from '@app/components/modules/EmployeeSideStepper';
import { EmployeeTopbar } from '@app/components/modules/EmployeeTopbar/EmployeeTopbar';
import { AddEmployeeFormProvider } from '@app/components/pages/addEmployee/AddEmployeeFormProvider';

export default function PeopleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="w-full">
        <EmployeeTopbar />
        <main className="p-8">
          <div className="grid grid-cols-workflow">
            <EmployeeSideStepper />
            <div className="col-span-1 px-8">
              <AddEmployeeFormProvider>{children}</AddEmployeeFormProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
