import React, { useEffect, useState} from 'react';
import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
// Componente Base en el cual Cargar HTML 
function ReportMenu  (){
    
    
    
    return(
        <div id='home'>
        
            {/*Aquí se genera la barra Slider que Divide el Header*/}
            <Slider
                title="Menu Reportes"
                size="slider-small"
            />  
        
            
        
            <div className='center'>
                <div id='content' >
                    <h1 className='subheader'>Menu Reportes</h1>
                    
                    

                       
                
                </div>
                
                <SideBar/> 
                {/*Divide la parte de arriba con el Footer*/}
            </div>
        </div>

    ); //End Return
    
}
export default ReportMenu;