import React, { useState, useEffect} from 'react';
import Restaurant from './pages/Restaurant';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav';

function App (){

return(
  <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/restaurante" component={Restaurant} />
          <Route path="/cozinha" component={""}/>
        </Switch>
      </div>
    </Router>

);

}

export default App;
