import React from 'react';
import Restaurant from './pages/Restaurant';
import Kitchen from './pages/Kitchen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav';
import './Bootstrap.css'
import Delivery from './pages/Delivery';

function App() {

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        // <Route exact path="/" component={Nav} />
          <Route path="/restaurante" component={Restaurant} />
          <Route path="/cozinha" component={Kitchen} />
          <Route path="/delivery" component={Delivery} />
        </Switch>
      </div>
    </Router>

  );

}

export default App;
