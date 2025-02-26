import { FC, Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../common/redux/store';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

interface ComponentProps { }

const Authenticationlayout: FC<ComponentProps> = () => {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme-mode', localStorage.getItem('nowadarktheme') === 'dark' ? 'dark' : 'light');

    document.documentElement.setAttribute('dir', localStorage.getItem('nowartl') === 'rtl' ? 'rtl' : 'ltr');
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <Helmet>
            <body className='error-page1'></body>
          </Helmet>
        </HelmetProvider>
        <Outlet />
      </Provider>
    </Fragment>
  );
};

export default Authenticationlayout;