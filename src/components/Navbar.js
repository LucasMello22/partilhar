import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><img src="/favicon.ico" alt="Logo" style={{ width: '30px', height: '30px' }} /></li>
        <li><Link to="/schedule-appointment">Marcar Consulta</Link></li>
        <li><Link to="/manage-patients">Gerenciar Pacientes</Link></li>
        <li><Link to="/manage-doctors">Gerenciar Médicos</Link></li> 
        <li><Link to="/view-records">Visualizar Consultas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
