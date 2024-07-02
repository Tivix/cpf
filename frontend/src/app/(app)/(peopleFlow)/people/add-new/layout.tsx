import { SideStepper, Step } from '@app/components/modules/SideStepper';
import { WorkflowTopbar } from '@app/components/modules/WorkflowTopbar';

const addEmployeeSteps: Step[] = [
  { label: '1. Personal details', state: 'inProgress', active: true },
  { label: '2. Main ladder', state: 'notStarted', active: false },
];

export default function PeopleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-full">
        <WorkflowTopbar />
        <main className="p-8">
          <div className="grid grid-cols-[minmax(200px,1fr),minmax(400px,1100px),1fr]">
            <SideStepper steps={addEmployeeSteps} />
            <div className="col-span-1 px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
