import React from 'react';
import Logo from "../image/logobq.png";

function Nav() {
  return (

    <nav className="navbar navbar-expand-sm navbar- mx-auto style= width: 30px  bg-dark">
      <div class="container">
        <div className="logo">
          <a href="/restaurante">
            <img src={Logo} />
          </a>
        </div>
        <div className="clearfix"></div>
        <div className="menu">
          <ul>
            <li className="">
              <a className="" href="/restaurante">Restaurante <span className="sr-only">(current)</span></a>
            </li>
            <li className="">
              <a className="" href="/cozinha">Cozinha</a>
            </li>
            <li className="">
              <a className="" href="/delivery">Delivery</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Nav;
