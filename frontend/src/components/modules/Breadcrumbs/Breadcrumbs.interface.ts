export interface BreadcrumbInterface {
  label: string;
  href: string;
  current: boolean;
}

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbInterface[];
}
