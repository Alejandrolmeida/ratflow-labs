import { FC, Fragment } from 'react';
import { Provider } from 'react-redux';
import Header from './layoutcomponent/header';
import { Outlet } from 'react-router-dom';
import store from '../common/redux/store';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface ComponentProps { }

const App: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <Helmet
            htmlAttributes={{
              lang: "en",
              dir: "ltr",
              "data-nav-layout": "horizontal",
              "data-theme-mode": "light",
              "data-header-styles": "light",
              "data-menu-styles": "light",
              "data-vertical-style": "overlay",
            }}
          >
            <body className=''></body>
          </Helmet>
        </HelmetProvider>
        <div className="page">
          <Header />
          <Outlet />
        </div>
      </Provider>
    </Fragment>
  );
};

export default App;