import { Fragment } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./index.scss";
import { Routingdata } from './common/routingdata';

import App from './layout/App';

import DashBoard from './DashBoard';
import Authenticationlayout from './layout/Authenticationlayout';
import Error500 from './components/pages/authentication/500error';
import Scrolltotop from './Scrolltotop';

//Form
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <HelmetProvider>
      <BrowserRouter>
      <Scrolltotop/>
        <Routes>
          {/* main layout */}
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />} >
          <Route index element={<DashBoard/>}/>
            <Route path={`${import.meta.env.BASE_URL}`} element={<DashBoard />} />
            {Routingdata.map((idx) => (
              <Route path={idx.path} element={idx.element} key={Math.random()} />
            ))}
          </Route>
          {/* authentication layout */}
          <Route path={`${import.meta.env.BASE_URL}`} element={<Authenticationlayout />}>

            <Route path='*' element={<Error500 />} />

            {/* other authentication */}
            <Route path={`${import.meta.env.BASE_URL}pages/authentication/500error`} element={<Error500 />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);

