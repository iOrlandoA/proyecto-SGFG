import React, {Component} from 'react';
import logo from '../../assets/images/logo.svg';
import NavBar from './NavBar';
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
                    <NavBar/>
                    {/* Limpiar Flotados */}
                    <div className="clearfix"></div>
                </div>
                

            </header>
        );
    }
}
export default Header;