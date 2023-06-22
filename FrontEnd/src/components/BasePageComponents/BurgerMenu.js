import React,{useRef} from "react";
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";




// Rutas para la navegación    (Orlando)
const BurgerMenu = ()=> {
    const line1BarsRef = useRef(null);
    const line2BarsRef = useRef(null);
    const line3BarsRef = useRef(null);

    const burgerMenu = (event)=> {
        line1BarsRef.current.classList.toggle('activeline1-bars-menu');
        line2BarsRef.current.classList.toggle('activeline2-bars-menu');
        line3BarsRef.current.classList.toggle('activeline3-bars-menu');        

    }
   
    return(
        
        <div className="burger-menu">       
            {/*Burger Menu*/}
            <div className='bars-menu' onClick={burgerMenu}>
                    <span ref={line1BarsRef} className='line1-bars-menu'></span>
                    <span ref={line2BarsRef} className='line2-bars-menu'></span>
                    <span ref={line3BarsRef} className='line3-bars-menu'></span>
                    
            </div>
            
            <div className="menu-side">
                <div className="name-page">
                    {/*Logo SGFG*/}
                </div>


                <div className="options-menu">
                    
                    <NavLink to="/home" activeclassname="active" className='option' >Inicio</NavLink>
                
                    <NavLink to="/crear-facturas" activeclassname="active" className='option'>Crear Factura</NavLink>

                    <NavLink to="/lista-facturas" activeclassname="active" className='option' >Facturas</NavLink>
            
                    <NavLink to="/search/Search " className='option' >Search</NavLink>
                
                </div>
            </div>
        </div>



    );
    
}

export default BurgerMenu;