import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { collectionId } from 'config';
import { routeNames } from 'routes';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!collectionId) {
      navigate(routeNames.build, { replace: true });
    }
  }, []);

  return (
    <section className='home d-flex flex-fill align-items-center container'>
      <div className='d-flex flex-column align-items-center w-100 text-center'>
        <h2 className='home-title'>Welcome to NFT Verify Dapp</h2>
        <p className='home-description'>
          This page offers an easy way to configure and verify the authenticity
          of a NFT holder.
          <br />
          Browse the links below and get started.
        </p>
        <div className='home-links'>
          <Link to='/build'>
            <button className='btn btn-primary'>Build</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
