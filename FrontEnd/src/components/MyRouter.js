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
import ReportMenu from "./MenuComponents/ReportMenu";



// Rutas para la navegación    (Orlando)
const MyRouter = ()=> {
    const body = useRef(null);
    

    const sideMenu = (event)=> {

        body.current.classList.toggle('body-move');        

    }
   
    return(
       
            <BrowserRouter>
                
                <BurgerMenu move={sideMenu}/>  
                <div ref={body}>
                    {/*Aquí se carga el Header de la Pantalla*/}
                    <Header/>       
                                                        

                        {/*Configuración de Rutas y Paginas*/}
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>  
                            <Route exact path="/home" element={<Home/>}/> 
                            <Route exact path="/crear-facturas" element={<BillMacker/>}/>
                            <Route exact path="/lista-facturas" element={<BillList/>}/>
                            <Route exact path="/search/:bill_ref" element={<BillSearch/>}/>
                            <Route exact path="/area-controller" element={<AreaController/>}/>
                            <Route exact path="/crear-pago/:id" element={<PaymentMacker/>}/>
                            <Route exact path="/menu-reportes" element={<ReportMenu/>}/>            
                            <Route path="*" element={<NotFound/>}/>
                        
                        </Routes>
                        
                        <div className="clearfix"></div> 

                        
                    

                    {/*Aquí se genera el Footer de la Pagina*/}
                    <Footer/>             
                </div>
            </BrowserRouter>
        
    );
    
}

export default MyRouter;