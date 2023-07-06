import React,{useState, useEffect, useReducer} from "react";
import Slider from '../BasePageComponents/Slider';
import { NavLink } from 'react-router-dom';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';
import GetData from '../FunctionalComponents/GetData';

const DO_SAVE = 'Guardar';
const DO_DELETE = 'Borrar';
const AREA_TYPE_INCOME = 'Ingreso';
const AREA_TYPE_OUTCOME = 'Gasto';

function AreaController (){

        
    //General Objets
   
    const [area, setArea]= useState({
        id: '',
        name : '',
        area_type : '',
        visible : true
    });
    const [areas, setAreas]= useState([ ]);
    const [goSend, setGoSend]= useState(false);
    const [goUpdate, setGoUpdate]= useState(false);
    const [goDelete, setGoDelete]= useState(false);
    const [validationTest, setValidationTest]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nameUpdated, setNameUpdated] = useState ('');

    //Genera una funcion cada que se obtengan de nuevo las areas
    function setAreasFun (areas){  
        setAreas(areas);
        setIsLoading(false);
    }
    

    // CHANGE AREA_TYPE
    const handleAreaTypeChange = (event) => {
        
        setArea ( prevArea => {
            return {...prevArea, area_type : event.target.value }
        } );
        
    }

    // CHANGE NAME
    const handleAreaChange = (event) => {
        
        setNameUpdated(areas[event.target.value].name);
        setArea(areas[event.target.value]);
        
    }

     // CHANGE AREA SELECTED
     const handleNameUpdatedChange = (event) => {
        setNameUpdated (event.target.value);
    }

    // VALIDATIONS FOR AREA AND SEND OPTIONS DEFINITIONS
    const send =(event)=>{
        setValidationTest([]);
        if (nameUpdated === "" ||  area.area_type === '') {
            
            if(nameUpdated === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "name", msg: "Nombre Vacío" }]);

            } 

            if(area.area_type === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "type", msg: "Tipo area Invalido" }]);
            } 
        
        }else{
            
            setArea ( prevArea => {
                return {...prevArea, name : nameUpdated }
            } );

            if (event.target.value === DO_SAVE){

                if(area.id === ''){
                    setGoSend(true); 
                }else{
                    setGoUpdate(true);
                }
                
            }
            
            if (event.target.value === DO_DELETE){
                if(area.visible===true){
                    setArea ( prevArea => {
                        return {...prevArea, visible : false }
                    } );
                    setGoUpdate(true);
                }else{
                    setGoDelete(true);
                }
                
                
            }           
        }       
    }


    //Clean Data and Refresh the Page
    const noSend=()=>{
        setGoSend(false);
        setGoUpdate(false);
        setGoDelete(false);
        setNameUpdated('');
        setArea({  
            id: '',
            name : '',
            type : '',
            
        });
        setTimeout(() => {
            setIsLoading(true);
        }, 400);
    }

    useEffect(()=>{
        setIsLoading(true);
    },[])
       


    // Update Areas from API
    if (isLoading) {
        return (
            <div>
            <GetData req={'/areas'} setData={setAreasFun} />
            <Slider title="Cargando ..." size="slider-small" />
            </div>
        );
    }

    // AREAS FORM
    return(
        <div>
        <div id='area-controller'>
            {/*Small Slider*/}
            
            <Slider  
                title="Areas"
                size="slider-small"/>  

            <div id="content" className="center">
            
                <form className="mid-form">


                    <div className="form-group select">
                        <label>Seleccione un Area</label>   
                        <select value = {area.name} onChange={handleAreaChange} >
                            <option value="">Seleccione una area</option>
                            {
                                areas.map((area, i) => {
                                    return(<option value={i}>{area.area_type} : {area.name} : {`${area.visible}`}</option> );
                                })
                            }
                        </select> 
                    
                    </div>

                   
                    <div className="form-group">
                        <label>Nombre del Area</label>
                        <input type="text" value={nameUpdated} onChange={handleNameUpdatedChange}/>
                    </div> 

                    
                    


                    <div className="form-group select">
                        <label>Tipo de Area</label>
                        <select value = {area.area_type} onChange={handleAreaTypeChange} >
                            <option value="">Seleccione una area</option>
                            <option value={AREA_TYPE_INCOME}>Ingresos</option>
                            <option value={AREA_TYPE_OUTCOME}>Gastos</option>
                        </select> 
                        
                    </div>
                    
                    

                    {/*Show bottons SAVE DELETE AND CANCEL*/}
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
                                id= {area.id}   
                            />
                        ):
                            goDelete === true? (
                            
                                <BtnConfirm
                                    object={area}
                                    objectType="areas"
                                    typeConfirm="delete"
                                    origin="/crear-facturas" 
                                    noSend= {noSend}   
                                    id= {area.id}   
                                />
                        ) :(
                            <div>
                                <div className="clearfix"></div>
                                <input type="button" value={DO_SAVE} className="btn btn-success" onClick={send} />  
                                <input type="button" value={DO_DELETE} className="btn btn-delete" onClick={send} />  
                                <NavLink to="/crear-facturas" className="btn btn-cancel"  >Cancelar</NavLink> 
                            </div>
                        ) 
                    }
                    {/*Show ERRORS*/}
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

            
                                
            
             </div>   
            {/*End Div Area Controller*/}
            </div>  
        </div>
    );                
}
export default AreaController;