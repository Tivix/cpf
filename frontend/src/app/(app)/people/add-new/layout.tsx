import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from '@app/components/common/Button';
import { DotVerticalIcon } from '@app/static/icons/DotVerticalIcon';
import { Step, Stepper } from '@app/components/common/Stepper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPF - Career Progression Framework',
  description: 'Career Progression Framework Application',
};

const addEmployeeSteps: Step[] = [
  { label: '1. Personal details', state: 'completed', active: true },
  { label: '2. Main ladder', state: 'inProgress', active: false },
  { label: '3. Test', state: 'notStarted', active: false },
];

const TopBar = () => {
  return (
    <div className="sticky top-0 flex h-16 items-center justify-between border-b border-b-navy-200 bg-white px-8">
      <div className="text-l font-semibold text-navy-900">Add employee</div>
      <div className="flex gap-x-4">
        <Button variant="borderless" styleType="natural">
          Cancel
        </Button>
        <Button variant="border" styleType="natural">
          Save as draft
        </Button>
        <Button disabled variant="solid">
          Activate Employee
        </Button>
        <Button variant="border" styleType="natural" className="flex h-11 w-11 justify-center p-0">
          <DotVerticalIcon />
        </Button>
      </div>
    </div>
  );
};

export default function PeopleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full bg-navy-50`}>
        <div className="flex">
          <div className="w-full">
            <TopBar />
            <main className="p-8">
              <div className="grid grid-cols-[minmax(200px,1fr),minmax(400px,1100px),1fr]">
                <Stepper steps={addEmployeeSteps} />
                <div className="col-span-1 px-8">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
