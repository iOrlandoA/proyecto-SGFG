import React,{Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";


//Componentes Base de la Pagina 
import Header from './BasePageComponents/Header';
import Slider from './BasePageComponents/Slider';
import SideBar from './BasePageComponents/SideBar';
import Footer from './BasePageComponents/Footer';
import NotFound from "./BasePageComponents/NotFound";


//Componentes Funcionales
import BillMacker from "./MenuComponents/BillMacker";
import BillList from "./MenuComponents/BillList";





// Rutas para la navegación    (Orlando)
class MyRouter extends Component{
    render(){
        return(
            
            <BrowserRouter>


                {/*Aquí se carga el Header de la Pantalla*/}
                <Header/>       

                {/*Aquí se genera la barra Slider que Divide el Header*/}
                <Slider/>  


                 {/*Aqui se muestra el Contenido Central*/}
                 <div className='center'>
                                              
                           

                    {/*Configuración de Rutas y Paginas*/}
                    <Routes>
                        <Route exact path="/" element={<BillMacker/>}/>  {/*Aqui va el Home */}
                        <Route exact path="/home" element={<BillMacker/>}/>  {/*Aqui va el Home */}
                        <Route exact path="/crear-facturas" element={<BillMacker/>}/>
                        <Route exact path="/lista-facturas" element={<BillList/>}/>
                        

                        <Route path="*" element={<NotFound/>}/>
                    
                    </Routes>


                    {/*Aquí se genera el cuadrante del lado derecho Slider para buscar facturas*/}
                    <SideBar/> 
                    <div className="clearfix"></div> {/*Divide la parte de arriba con el Footer*/}
                </div>

                {/*Aquí se genera el Footer de la Pagina*/}
                <Footer/> 


                

            </BrowserRouter>
        );
    }
}

export default MyRouter;