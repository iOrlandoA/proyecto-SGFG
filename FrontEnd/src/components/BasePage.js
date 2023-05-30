import React, {Component} from 'react';
import Header from './BasePageComponents/Header';
import Slider from './BasePageComponents/Slider';
import SideBar from './BasePageComponents/SideBar';
import Footer from './BasePageComponents/Footer';
import MyRouter from './MyRouter';



// Componente Base de la Pagina en la cual se cargan las Rutas
class BasePage extends Component{
    render(){
        return(
            
            <div>
                {/*Aquí se carga el Header de la Pantalla*/}
                <Header/>       

                {/*Aquí se genera la barra Slider que Divide el Header*/}
                <Slider/>      

                
                {/*Aqui se muestra el Contenido Central*/}
                <div className='center'>
                    <section id='content'>
                    <section className='components'>
                        
                        {/*Aquí se cargan los componentes funcionales*/}
                        <MyRouter /> 

                    </section>
                    </section>


                    {/*Aquí se genera el cuadrante del lado derecho Slider para buscar facturas*/}
                    <SideBar/> 
                    <div className="clearfix"></div> {/*Divide la parte de arriba con el Footer*/}

                </div>

                {/*Aquí se genera el Footer de la Pagina*/}
                <Footer/> 
            </div>


        );
    }
}
export default BasePage;