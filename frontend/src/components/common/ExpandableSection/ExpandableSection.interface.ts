export interface ExpandableSectionProps {
  title: string;
  description?: string;
  showVerticalLine?: boolean;
  open: boolean;
  onClick: () => void;
}
