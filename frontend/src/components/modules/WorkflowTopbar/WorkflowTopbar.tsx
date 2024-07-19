import { Button } from '@app/components/common/Button';
import { DotVerticalIcon } from '@app/static/icons/DotVerticalIcon';
import { FC } from 'react';
import { WorkflowTopbarProps } from './WorkflowTopbar.interface';

export const WorkflowTopbar: FC<WorkflowTopbarProps> = ({
  title,
  cancelTitle,
  saveTitle,
  activateTitle,
  onCancel,
  onSave,
  onActivate,
}) => {
  return (
    <div className="sticky top-0 flex h-16 items-center justify-between border-b border-b-navy-200 bg-white px-8">
      <div className="text-l font-semibold text-navy-900">{title}</div>
      <div className="flex gap-x-4">
        <Button variant="borderless" styleType="natural" onClick={onCancel}>
          {cancelTitle}
        </Button>
        <Button variant="border" styleType="natural" onClick={onSave}>
          {saveTitle}
        </Button>
        <Button disabled variant="solid" onClick={onActivate}>
          {activateTitle}
        </Button>
        <Button variant="border" styleType="natural" className="flex h-11 w-11 justify-center p-0">
          <DotVerticalIcon />
        </Button>
      </div>
    </div>
  );
};
