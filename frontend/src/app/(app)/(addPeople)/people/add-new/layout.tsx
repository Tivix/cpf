import { EmployeeSideStepper } from '@app/components/modules/EmployeeSideStepper';
import { WorkflowTopbar } from '@app/components/modules/WorkflowTopbar';

export default function PeopleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="w-full">
        <WorkflowTopbar />
        <main className="p-8">
          <div className="grid grid-cols-[minmax(200px,1fr),minmax(400px,1100px),1fr]">
            <EmployeeSideStepper />
            <div className="col-span-1 px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
