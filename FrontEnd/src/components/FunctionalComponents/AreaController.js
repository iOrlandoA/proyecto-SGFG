import React,{useState, useEffect} from "react";
import Slider from '../BasePageComponents/Slider';
import { NavLink } from 'react-router-dom';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';
import GetData from '../FunctionalComponents/GetData';


function AreaController (){

        
    //Genera objetos state cambiantes 
   
    const [area, setArea]= useState({
        name : '',
        type: ''
    });
    const [areas, setAreas]= useState([ ]);
    const [goSend, setGoSend]= useState(false);
    const [goUpdate, setGoUpdate]= useState(false);
    const [validationTest, setValidationTest]= useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cambio Nombre
    const handleNameChange = (event) => {
        setArea ( prevArea => {
            return {...prevArea, name : event.target.value }
        } );
        
    }
    // Cambio Tipo
    const handleAreaTypeChange = (event) => {
        setArea ( prevArea => {
            return {...prevArea, type : event.target.value }
        } );
    }

    // Cambio en el area seeleccionada
    const handleAreaChange = (event) => {
        setArea (event.target.value);
    }

    // Validación de Envio
    const send =(typeAction)=>{
        setValidationTest([]);
        if (area.name === "" ||  area.type === '') {
            
            if(area.name === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "name", msg: "Nombre Vacío" }]);

            } 

            if(area.type === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "bill_ref", msg: "Numero Factura Vacío o Invalido" }]);
            } 
        
        }else{
            if (typeAction === 'save'){
                setGoSend(true); 
            }
            if (typeAction === 'update'){
                setGoUpdate(true);
            }           
        }       
    }


    //No envía Nada y borra todo
    const noSend=()=>{
        setGoSend(false);
        setArea({  
            name : '',
            type : '',
            
        });
    }

    useEffect(()=>{
        setIsLoading(true);
    },[])
       


    // Generar actualización de areas
    if (isLoading) {
        return (
            <div>
            <GetData req={'/areas'} setData={setAreas} />
            <h1 className="subheader">Cargando...</h1>
            </div>
        );
    }


    return(
        <div>
        <div id='area-controller'>
            {/*Se introduce el Slider en pequeño*/}
            
                
            <form className="mid-form">


                <div className="form-group select">
                    <label>Seleccione un Area</label>   
                    <select value = {area.name} onChange={handleAreaChange} >
                        <option value="">Seleccione una area</option>
                        {
                            areas.map((area, i) => {
                                return(<option key ={i} value={area.area_type}>{area.area_type}</option> );
                            })
                        }
                    </select> 
                
                </div>


                <div className="form-group">
                    <label>Nombre del Area</label>
                    <input type="text" value={area.name} onChange={handleNameChange}/>
                </div>


                <div className="form-group select">
                    <label>Tipo de Area</label>
                    <select value = {area.type} onChange={handleAreaTypeChange} >
                        <option value="">Seleccione una area</option>
                        <option value="Ingresos"></option>
                        <option value="Gastos"></option>
                    </select> 
                    
                </div>
                
                

                {/*Muestra botones de Guardar|Actualizar y  Confirmar guardado si los datos son correctos*/}
                {
                    
                    goSend === true ?( 
                        <BtnConfirm
                            object={area}
                            objectType="areas"
                            typeConfirm="save"
                            origin="/crear-facturas" 
                            noSend= {noSend}      
                        />

                    ): goUpdate === true? (
                        
                        <BtnConfirm
                            object={area}
                            objectType="areas"
                            typeConfirm="update"
                            origin="/crear-facturas" 
                            noSend= {noSend}      
                        />
                    ) :(
                        <div>
                            <div className="clearfix"></div>
                            <input type="button" value="Guardar" className="btn btn-success" onClick={send('save')} />  
                            <input type="button" value="Actualizar" className="btn btn-success" onClick={send('update')} />  
                            <NavLink to="/home" className="btn btn-cancel"  >Cancelar</NavLink> 
                        </div>
                    ) 
                }
                {/*Muestra muestra posibles errores en los input de datos*/}
                {validationTest.length !==0 &&
                    <div>
                        <p className='subtitle'> Errores en la creación de factura </p>
                        {validationTest.map((val, i) => {
                            return( 
                                    <div>
                                        <p id='validation-error'>  {val.msg}  </p>
                                        <div className='clearfix'></div>
                                    </div>
                                );
                        })}
                    </div>
                }
                

            </form>

            
                                
            

            {/*End Div Area Controller*/}
            </div>  
        </div>
    );                
}
export default AreaController;