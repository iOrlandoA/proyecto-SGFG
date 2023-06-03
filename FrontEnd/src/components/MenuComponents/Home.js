import React, {Component} from 'react';
import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
// Componente Base en el cual Cargar HTML 
class Home extends Component{
    render(){
        return(
            <div id='home'>
            
                {/*Aquí se genera la barra Slider que Divide el Header*/}
                <Slider
                    title="Inicio"
                    btn="Libro Bancos"
                    btnUrl="#"
                    size="slider-big"/>  
            
                
            
                <div className='center'>
                    <div id='content' >
                        <h1 className='subheader'>Inicio</h1>
                    </div>
                    {/*Aquí se genera el cuadrante del lado derecho Slider para buscar facturas*/}
                    
                    <SideBar/> 
                    {/*Divide la parte de arriba con el Footer*/}
                </div>
            </div>

        );
    }
}
export default Home;