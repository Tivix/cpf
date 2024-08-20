export interface WorkflowTopbarProps {
  title: string;
  cancelTitle: string;
  activateTitle: string;
  saveTitle: string;
  onCancel: () => void;
  onSave: () => void;
  onActivate?: () => void;
  activateDisabled?: boolean;
}
