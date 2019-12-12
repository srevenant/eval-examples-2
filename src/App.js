import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Pilots from './components/Pilots';
import Starships from './components/Starships';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Starships} exact />
        <Route path="/ship-detail/:id" component={Pilots} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
