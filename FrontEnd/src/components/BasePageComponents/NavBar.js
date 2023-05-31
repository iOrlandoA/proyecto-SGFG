import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

// Componente en la cual se encuentra la Barra de Navegación del Menu Principal (Orlando)
class NavBar extends Component{
    render(){
        return(
           
            <nav id="menu">



                 {/* Menu Navegación */}
                <ul>
                    <li>
                        <NavLink to="/home">Inicio</NavLink>
                    </li>

                    <li>
                        <NavLink to="#">Libro de Bancos</NavLink>
                    </li>

                    <li>
                        <NavLink to="/crear-facturas">Crear Factura</NavLink>
                    </li>

                    <li>
                        <NavLink to="/lista-facturas">Lista Facturas</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="#">Menu Reportes</NavLink>
                    </li>

                </ul>
            </nav>
          
        );
    }
}
export default NavBar;