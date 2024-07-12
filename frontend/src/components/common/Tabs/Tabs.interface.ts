export interface TabsProps {
  tabs: {
    key: string;
    label: string;
    href: string;
  }[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}
