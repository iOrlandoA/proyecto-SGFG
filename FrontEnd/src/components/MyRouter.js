import React,{Component} from "react";
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
import BillOnList from "./FunctionalComponents/BillOnList";
import PaymentOnList from "./FunctionalComponents/PaymentOnList";



// Rutas para la navegación    (Orlando)
class MyRouter extends Component{
    render(){
        return(
            
            <BrowserRouter>


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
                        <Route exact path="/lista-pagos/:id" element={<PaymentOnList/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    
                    </Routes>
                    
                    <div className="clearfix"></div> 

                   
               

                {/*Aquí se genera el Footer de la Pagina*/}
                <Footer/>             

            </BrowserRouter>
        );
    }
}

export default MyRouter;