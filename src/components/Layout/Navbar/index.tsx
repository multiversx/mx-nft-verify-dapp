import React from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Nav, Navbar as BsNavbar, NavItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as MultiversXLogo } from 'assets/img/multiversx.svg';
import { dAppName } from 'config';
import { routeNames } from 'routes';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const { search } = useLocation();

  const handleLogout = () => {
    logout(`${window.location.origin}/${routeNames.verify}/${search}`);
  };

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.home : routeNames.verify}
        >
          <MultiversXLogo className='multiversx-logo' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <NavItem>
              <button className='btn btn-link' onClick={handleLogout}>
                Close
              </button>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};
