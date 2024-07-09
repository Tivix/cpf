import { Button } from '@app/components/common/Button';
import { DotVerticalIcon } from '@app/static/icons/DotVerticalIcon';

export const WorkflowTopbar = () => {
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
