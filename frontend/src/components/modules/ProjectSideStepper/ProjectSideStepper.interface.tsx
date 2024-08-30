import { routes } from '@app/constants';

type AddProjectRoutes = typeof routes.mySpace.addNew;
export type AddProjectRouteKeys = AddProjectRoutes[keyof AddProjectRoutes];
