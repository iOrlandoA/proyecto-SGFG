import React,{useRef} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";


//Componentes Base de la Pagina 
import Header from './BasePageComponents/Header';
import Footer from './BasePageComponents/Footer';
import NotFound from "./BasePageComponents/NotFound";


//Componentes Funcionales
import BillMacker from "./MenuComponents/BillMacker";
import BillList from "./MenuComponents/BillList";
import Home from "./MenuComponents/Home";
import BillSearch from "./FunctionalComponents/BillSearch";
import AreaController from "./FunctionalComponents/AreaController";
import PaymentMacker from "./FunctionalComponents/PaymentMacker";
import BurgerMenu from "./BasePageComponents/BurgerMenu";



// Rutas para la navegación    (Orlando)
const MyRouter = ()=> {
    const line1BarsRef = useRef(null);
    const line2BarsRef = useRef(null);
    const line3BarsRef = useRef(null);

    const burgerMenu = (event)=> {
        line1BarsRef.current.classList.toggle('activeline1-bars-menu');
        line2BarsRef.current.classList.toggle('activeline2-bars-menu');
        line3BarsRef.current.classList.toggle('activeline3-bars-menu');        

    }
   
    return(
        
        <BrowserRouter>
        

            {/*Aquí se carga el Header de la Pantalla*/}
            <Header/>       
            <BurgerMenu/>                                        

                {/*Configuración de Rutas y Paginas*/}
                <Routes>
                    <Route exact path="/" element={<Home/>}/>  
                    <Route exact path="/home" element={<Home/>}/> 
                    <Route exact path="/crear-facturas" element={<BillMacker/>}/>
                    <Route exact path="/lista-facturas" element={<BillList/>}/>
                    <Route exact path="/search/:bill_ref" element={<BillSearch/>}/>
                    <Route exact path="/area-controller" element={<AreaController/>}/>
                    <Route exact path="/crear-pago/:id" element={<PaymentMacker/>}/>
                    <Route path="*" element={<NotFound/>}/>
                
                </Routes>
                
                <div className="clearfix"></div> 

                
            

            {/*Aquí se genera el Footer de la Pagina*/}
            <Footer/>             

        </BrowserRouter>
    );
    
}

export default MyRouter;