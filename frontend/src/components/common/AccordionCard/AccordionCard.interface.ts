export interface AccordionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  expandedByDefault?: boolean;
  small?: boolean;
}
