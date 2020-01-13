import React from 'react';
import Logo from "../image/logobq.png";
import { Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

function Nav() {
  return (
      <nav className="navbar navbar-expand-sm navbar- mx-auto style= width: 80px  bg-dark">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand pull-right"><img className={css(styles.logo)} src={Logo} width="15%" height="10%"/></a>
          {/*      <figure>   
      <a className="navb  ar-brand" href="#">Burger Queen</a> 
      <img src="/img/logobq.png" width="30" height="30" alt=""></img>
      <figure>
      <a className="navb  ar-brand" href="#">Burger Queen</a> */}
          {/* <figure >
        <img className={css(styles.imgLogo)} src={require("../image/logobq.png")}></img>
     </figure> */}

          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/restaurante">Restaurante <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cozinha">Cozinha</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/delivery">Delivery</a>
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
    background: "#343a40",
  },

  // logo: {
  //   display: 'flex',
  //   justifyContent: 'center',
  // }
})