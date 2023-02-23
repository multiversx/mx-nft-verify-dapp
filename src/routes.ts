import { withPageTitle } from 'components';
import { dAppName } from 'config';
import { Home } from 'pages/Home';
import { Result } from 'pages/Result';
import { Verification } from 'pages/Verification';

export const routeNames = {
  home: '/',
  verify: '/verify',
  result: '/result'
};

const routes = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.verify,
    title: 'Verification',
    component: Verification
  },
  {
    path: routeNames.result,
    title: 'Result',
    component: Result,
    authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} •  MultiversX ${dAppName}`
    : `MultiversX ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
