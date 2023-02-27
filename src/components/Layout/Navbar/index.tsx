import React from 'react';
import { Navbar as BsNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as MultiversXLogo } from 'assets/img/multiversx.svg';
import { dAppName } from 'config';
import { routeNames } from 'routes';

export const Navbar = () => {
  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={routeNames.home}
        >
          <MultiversXLogo className='multiversx-logo' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>
      </div>
    </BsNavbar>
  );
};
