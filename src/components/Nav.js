import React from 'react';
import { Link } from "react-router-dom";

function Nav (){
    return (
        <nav>
        <ul>
          <li>
            <Link to="/restaurante">Restaurante</Link>
          </li>
          <li>
            <Link to="/cozinha">Cozinha</Link>
          </li>
        </ul>
      </nav>
    )
}

export default Nav;