import { ClassName } from '@app/types/common';
import { OutputData } from '@editorjs/editorjs';

export interface EditorProps {
  data?: OutputData;
  name: string;
  label?: string;
  className?: ClassName;
}

export const holder = 'editorjs-container' as const;
