import { Button } from '@app/components/common/Button';
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
  activateDisabled,
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
        <Button disabled={activateDisabled} variant="solid" onClick={onActivate}>
          {activateTitle}
        </Button>
      </div>
    </div>
  );
};
