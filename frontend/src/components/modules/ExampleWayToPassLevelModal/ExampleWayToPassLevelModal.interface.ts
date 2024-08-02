import { ExampleProject } from '@app/types/library';

export interface ExampleWayToPassLevelModalProps {
  open: boolean;
  onClose: () => void;
  projects: ExampleProject[];
}
