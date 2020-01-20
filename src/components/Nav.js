import React from 'react';
import Logo from "../image/logobq.png";
import { StyleSheet, css } from 'aphrodite';

function Nav() {
  return (

      <nav className="navbar navbar-expand-sm navbar- mx-auto style= width: 30px  bg-dark">
      <div class="container">
        <div class="navbar-header align-items-centertext-center">
          <a class="navbar-brand pull d-flex justify-content-center"><img className={css(styles.logo)} src={Logo} width="5%" height="5%"/></a>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse align-content-xl-center" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/restaurante">Restaurante <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cozinha">Cozinha</a>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="/delivery">Delivery</a> */}
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Nav;

 const styles = StyleSheet.create({
    logo: {
    width: '25%',
    height: '10%',
    marginTop:'5%',
    display: 'flex',
    },

})