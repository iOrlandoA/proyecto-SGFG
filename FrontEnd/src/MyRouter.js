import React,{Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import NotFound from "./components/BasePageComponents/NotFound";
import BillMacker from "./components/MenuComponents/BillMacker";
import BillList from "./components/MenuComponents/BillList";


// Rutas para la navegación    (Orlando)
class MyRouter extends Component{
    render(){
        return(
            
            <BrowserRouter>

                {/*Configuración de Rutas y Paginas*/}

                <Routes>
                    <Route exact path="/" element={<BillMacker/>}/>  {/*Aqui va el Home */}
                    <Route path="/crear-facturas" element={<BillMacker/>}/>
                    <Route path="/lista-facturas" element={<BillList/>}/>
                    

                    <Route path="*" element={<NotFound/>}/>
                    
                </Routes>

            </BrowserRouter>
        );
    }
}

export default MyRouter;