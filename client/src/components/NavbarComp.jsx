import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/assets/svg/logo-dark-hooy.svg" alt="LOGO" />
      </Link>
      <div className="option">
        <div className="option-icon">
          <i id="op-icon" className="fa fa-home"></i>
        </div>
        <Link className="option-link" to="/">Inicio</Link>
      </div>
      <div className="option">
        <div className="option-icon">
          <i id="op-icon" className="fa fa-th-list"></i>
        </div>
        <Link className="option-link" to="/pricelist">Lista de Precios</Link>
      </div>
      <div className="option">
        <div className="option-icon">
          <i id="op-icon" className="fa fa-upload"></i>
        </div>
        <Link className="option-link" to="/uploadlists">Cargar Listas</Link>
      </div>
      <div className="option">
        <div className="option-icon">
          <i id="op-icon-e" className="fa fa-truck"></i>
        </div>
        <Link className="option-link" to="/providers">Proveedores</Link>
      </div>
      <div className="credit">Designed by Santi</div>
    </nav>
  );
};

export default Navbar;
