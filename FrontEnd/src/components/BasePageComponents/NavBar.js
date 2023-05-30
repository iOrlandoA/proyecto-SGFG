import React, {Component} from 'react';
// Componente Base en el cual Cargar HTML (Orlando)
class NavBar extends Component{
    render(){
        return(
           
            <nav id="menu">
                 {/* Menu Navegación */}
                <ul>
                    <li>
                        <a href="/">Inicio</a>
                    </li>

                    <li>
                        <a href="#">Libro de Bancos</a>
                    </li>

                    <li>
                        <a href="/crear-facturas">Crear Factura</a>
                    </li>

                    <li>
                        <a href="/lista-facturas">Lista Facturas</a>
                    </li>
                    
                    <li>
                        <a href="#">Menu Reportes</a>
                    </li>

                </ul>
            </nav>
          
        );
    }
}
export default NavBar;