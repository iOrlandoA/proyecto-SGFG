import React,{useRef} from "react";
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.svg';




// Rutas para la navegación    (Orlando)
const BurgerMenu = ({move})=> {
    const line1BarsRef = useRef(null);
    const line2BarsRef = useRef(null);
    const line3BarsRef = useRef(null);
    const sideMenu = useRef(null);

    const burgerMenu = (event)=> {
        line1BarsRef.current.classList.toggle('activeline1-bars-menu');
        line2BarsRef.current.classList.toggle('activeline2-bars-menu');
        line3BarsRef.current.classList.toggle('activeline3-bars-menu');  
        sideMenu.current.classList.toggle('menu-side-move');  
        move(event);    

    }
   
    return(
        
        <div id="menu-side">       
            {/*Burger Menu*/}
            <div className='bars-menu' onClick={burgerMenu}>
                    <span ref={line1BarsRef} className='line1-bars-menu'></span>
                    <span ref={line2BarsRef} className='line2-bars-menu'></span>
                    <span ref={line3BarsRef} className='line3-bars-menu'></span>   
            </div>
            
            <div className="menu-side" ref={sideMenu}>
                <div className="name-page">
                    <img src={logo} className="app-logo" alt="logotipo"/>
                </div>


                <div className="options-menu" >
                    <div className="option-menu">
                        <NavLink to="/home" activeclassname="active" > Inicio</NavLink>
                    </div>
                    <div className="option-menu">
                        <NavLink to="/crear-facturas" activeclassname="active" >Crear Factura</NavLink>
                    </div>
                    <div className="option-menu">
                        <NavLink to="/lista-facturas" activeclassname="active"  >Facturas</NavLink>
                    </div>
                    <div className="option-menu">
                        <NavLink to="/search/Search " className='option' >Search</NavLink>
                    </div>
                </div>
            </div>
        </div>



    );
    
}

export default BurgerMenu;