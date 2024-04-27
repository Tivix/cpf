export interface AccordionListProps {
    items: {
        title: string;
        children?: JSX.Element;
    }[];
}

export interface AccordionListItemProps {
    title: string;
}
