import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import search from  '../../assets/images/icons/search.svg'; 

// Componente en la cual se encuentra la Barra de Navegación del Menu Principal (Orlando)
class NavBar extends Component{
    render(){
        return(
           
            <nav id="menu">



                 {/* Menu Navegación */}
                <ul>
                    <li>
                        <NavLink to="/home" activeclassname="active" >Inicio</NavLink>
                    </li>


                    <li>
                        <NavLink to="/crear-facturas" activeclassname="active" >Crear Factura</NavLink>
                    </li>

                    <li>
                        <NavLink to="/lista-facturas" activeclassname="active" >Facturas</NavLink>
                    </li>

                    
                    <li>
                        <NavLink to="#"  >Menu Reportes</NavLink>
                    </li>

                    <li>
                        <NavLink to="/search" > <img id='nav-img'  src={search}  alt='search-img'></img>Search</NavLink>
                    </li>

                </ul>
            </nav>
          
        );
    }
}
export default NavBar;