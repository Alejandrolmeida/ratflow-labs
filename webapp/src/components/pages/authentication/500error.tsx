import { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Error500: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <body className='error-1 bg-primary'></body>
        </Helmet>
      </HelmetProvider>
      <div className="square-box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="page error-bg">
        <div className="main-error-wrapper page page-h">
          <div className="container">
            <div className="text-center my-auto">
              <div className="row align-items-center justify-content-center h-100">
                <div>
                  <h1 className="text-white">500<span className="fs-20">error</span></h1>
                  <h2 className="text-white">Oops. The page you were looking for doesn't exist.</h2>
                  <h6 className="text-white op-6">You may have mistyped the address or the page may have moved.</h6><Link className="btn btn-light" to={`${import.meta.env.BASE_URL}`}>Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Error500;