import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
    
  const getTitle = () => {
      switch (location.pathname) {
          case '/':
              return 'Inicio';
          case '/pricelist':
              return 'Lista de Precios';
          case '/uploadlists':
              return 'Cargar Listas';
          case '/providers':
              return 'Gestion de Proveedores';
          default:
              return 'Gestor de Listas de Precios';
      }
  };

    return (
    <header className="header">
      <div className="htitle">
        <h1>{getTitle()}</h1>
      </div>
      <div className="account">
        <div className="profile">
          <a id="user-acc" className="fa fa-user-circle-o"></a>
        </div>
        <div className="menu">
          <h3>Admin</h3>
          <p>Cuenta Administrativa</p>
          <ul>
            <li>
              <i className="fa fa-user"></i>
              <a href="#">Profile</a>
            </li>
            <li>
              <i className="fa fa-right-from-bracket"></i>
              <a href="../pages/login.html">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    );
};

export default Header;
