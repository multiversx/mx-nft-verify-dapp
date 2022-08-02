import * as React from 'react';
import { Verification } from '../../components/Verification';

const Home = () => {
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center'>
              <h2 className='mb-3' data-testid='title'>
                NFT Ticket Verification
              </h2>

              <Verification />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
