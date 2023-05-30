import React, {Component} from 'react';
import logo from '../../assets/images/logo.svg';

// Componente donde se genera el Header (Orlando)
class Header extends Component{
    render(){
        return(
            <header id="header">
            
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="logotipo"/>
                        <span id="brand"> 
                            
                        </span>
                    </div>

                    {/* Menu Navegación */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <a href="home.html">Inicio</a>
                            </li>

                            <li>
                                <a href="bankBook.html">Libro de Bancos</a>
                            </li>

                            <li>
                                <a href="billForm.html">Crear Factura</a>
                            </li>

                            <li>
                                <a href="#">Lista Facturas</a>
                            </li>
                            
                            <li>
                                <a href="#">Menu Reportes</a>
                            </li>

                        </ul>
                    </nav>
                    {/* Limpiar Flotados */}
                    <div className="clearfix"></div>
                </div>
                

            </header>
        );
    }
}
export default Header;