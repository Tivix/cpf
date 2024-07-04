import { routes } from '@app/constants';

type AddNewPersonRoutes = typeof routes.people.addNew;
export type AddNewPersonRouteKeys = AddNewPersonRoutes[keyof AddNewPersonRoutes];
