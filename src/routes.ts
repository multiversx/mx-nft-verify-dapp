import { dAppName } from 'config';
import OwnershipVerification from 'pages/OwnershipVerification';
import withPageTitle from './components/PageTitle';
import Home from './pages/Home';

export const routeNames = {
  home: '/',
  verify: '/verify'
};

const routes = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home,
    authenticatedRoute: true
  },
  {
    path: routeNames.verify,
    title: 'Verification',
    component: OwnershipVerification
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
