import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SpotlightLogo } from 'assets/img/xspotlight.svg';
import { routeNames } from 'routes';

export const Navbar = () => {
  return (
    <header className='header'>
      <Link
        className='d-flex align-items-center navbar-brand mr-0'
        to={routeNames.home}
      >
        <SpotlightLogo className='spotlight-logo' />
      </Link>
    </header>
  );
};
