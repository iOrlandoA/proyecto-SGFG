import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
import {NavLink} from 'react-router-dom';
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
                    
                    <div>
                    
                        <h1 className='subheader'></h1>
                        
                        <div className='wrapper'>
                            <div className='column'>
                                <NavLink to='/reporte-pagos' className="btn-white">Reporte Por Pagos</NavLink> 
                            </div>
                            <div className='column'>
                                <NavLink to='/reporte-facturas-area' className="btn-white">Reporte Por Area</NavLink> 
                            </div>

                            <div className='column'>
                                <NavLink to='/reporte-cuentas/0' className="btn-white">Cuentas Por Cobrar</NavLink> 
                            </div>
                            <div className='column'>
                                <NavLink to='/reporte-cuentas/1' className="btn-white">Cuentas Por Pagar</NavLink> 
                            </div>

                        </div>

                   
                    </div>
                       
                
                </div>
                
                <SideBar/> 
                {/*Divide la parte de arriba con el Footer*/}
            </div>
        </div>

    ); //End Return
    
}
export default ReportMenu;