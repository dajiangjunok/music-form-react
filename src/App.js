import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import routes from "@/router";

import YJAppHeader from 'components/app-hearder';
import YJAppFooter from 'components/app-footer';
import YJPlayer from '@/pages/player/app-play-bar'
import { HashRouter } from 'react-router-dom';
import store from './store';

export default memo(function App () {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <YJAppHeader />
          {renderRoutes(routes)}
          <YJAppFooter />
          <YJPlayer />
        </HashRouter>
      </Provider>
    </div>
  )
})

