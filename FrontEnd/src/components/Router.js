import React,{Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import BillMacker from "./MenuComponents/BillMacker";
import BillList from "./MenuComponents/BillList";


// Rutas para la navegación    (Orlando)
class Router extends Component{
    render(){
        return(
            
            <BrowserRouter>

                {/*Configuración de Rutas y Paginas*/}

                <Switch>
                    <Route path="/rutaCrearFactura" component={BillMacker}></Route>
                    <Route path="/rutaListaFacturas" component={BillList}></Route>
                    
                </Switch>

            </BrowserRouter>
        );
    }
}

export default Router;