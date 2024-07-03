export interface AccordionListProps {
  items: {
    key: string;
    title: string;
    children?: JSX.Element;
  }[];
}

export interface AccordionListItemProps {
  title: string;
  noContentTooltipText: string;
}
