export interface ExpandableSectionProps {
  title: string;
  description?: string;
  verticalLine?: boolean;
  open: boolean;
  onClick: () => void;
}
