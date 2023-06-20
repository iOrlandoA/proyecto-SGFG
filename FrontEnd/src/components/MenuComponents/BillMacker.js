import React, {useEffect, useState} from 'react';
import SideBar from '../BasePageComponents/SideBar';
import Slider from '../BasePageComponents/Slider';
import { NavLink } from 'react-router-dom';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';
import GetData from '../FunctionalComponents/GetData';
import moreOptions from '../../assets/images/icons/moreOptions.svg';


const AREA_TYPE_INCOME = 'Ingreso';
const AREA_TYPE_OUTCOME = 'Gasto';

// Formulario con los campos para crear una factura (Orlando)

function BillMacker (){
   
    //Genera objetos state cambiantes 
   
    const [bill, setBill]= useState({
        name : '',
        price : '',
        area_id : '',
        description : '',
        date_created : '',
        date_expired : '', 
        bill_ref: ''
    });
    const [areas, setAreas]= useState([]);
    const [goSend, setGoSend]= useState(false);
    const [validationTest, setValidationTest]= useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // Cambia cuando se cambia el nombre
    const handleNameChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, name : event.target.value }
        } );
        
    }


    // Cambia cuando se cambia el Precio
    const handlePriceChange = (event) => {

        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, price : event.target.value }
            } );
        }
       
    }

     // Cambia cuando se cambia el Comprobante
    const handleBillRefChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, bill_ref : event.target.value }
            } );
        }    
    }


    // Cambia cuando se selecciona una Area Nueva
    const handleAreaChange = (event) => {
        console.log (event.target.value);
        setBill ( prevBill => {
            return {...prevBill, area_id : event.target.value }
        } );
    }

    // Cambia cuando se cambia la Descripcion
    const handleDescriptionChange = (event) => {
        setBill ( prevBill => {
            return {...prevBill, description : event.target.value }
        } );
    }


    // Cambia cuando se selecciona una Fecha Creacion Nueva
    const handleDateCreatedChange = (event) => {
        setBill ( prevBill => {
            return {...prevBill, date_created : event.target.value }
        } );
        
    }
    // Cambia cuando se selecciona una Fecha Expiracion Nueva
    const handleDateExpiredChange = (event) => {
        setBill ( prevBill => {
            return {...prevBill, date_expired : event.target.value }
        } );
    }


    //Realiza las validaciones para el correcto envío de Factura
    const send =()=>{
        setValidationTest([]);
        if (bill.name === "" ||  bill.price === '' ||
            bill.area === "" || bill.dateCreated === "" || bill.bill_ref === ''  ) 
        {
            
            if(bill.name === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "name", msg: "Nombre Vacío" }]);

            } 

            if(bill.bill_ref === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "bill_ref", msg: "Numero Factura Vacío o Invalido" }]);
            } 

            if(bill.price === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "price", msg: "Precio Vacío o Invalido" }]);
            }
            if(bill.area === '') {
                
                setValidationTest((prevState) => [...prevState, { type: "area", msg: "Campo area Vacío" }]);
            }
            if(bill.date_created === ''){
              
                setValidationTest((prevState) => [...prevState, { type: "date_created", msg: "Fecha Inicio Vacía" }]);
            } 
            
            
            
        }else{
            setGoSend(true);            
        }   
        
    }




    //No envía Nada y borra todo
    const noSend=()=>{
        setGoSend(false);
        setBill({  
            name : '',
            price : '',
            area :'',
            description : '',
            date_created : '',
            date_expired : '', 
            bill_ref: ''
            
        });
            


    }
        

    //Si se monto el Componentes
    useEffect( ()=>{
        setGoSend(false);
        setIsLoading(true);

    },[]);


    // Trae los datos de las Areas
    const setData = (data) =>{
        setAreas(data);
        setIsLoading(false);
    }

     // Return the loading state and gets the API data
    if (isLoading) {
        return (
            <div>
            <GetData req={'/areas'} setData={setData} />
            <h1 className="subheader">Cargando...</h1>
            </div>
        );
    }
      
    return(
        <div>
        <div id='bill-macker'>
            {/*Se introduce el Slider en pequeño*/}
            <Slider  
                title="Crear Factura"
                size="slider-small"/>  

            <div id="content" className="center">
                
                <h1 className="subheader"></h1>
                <form className="mid-form">

                    <div className="form-group">
                        <label>Proveedor/Cliente</label>
                        <input type="text" value={bill.name} onChange={handleNameChange}/>
                    </div>

                    <div className="form-group">
                        <label>Numero Factura</label>
                        <input type="number" value={bill.bill_ref} onChange={handleBillRefChange}/>
                    </div>

                    <div className="form-group">
                        <label>Monto Total</label>
                        
                        <input type="number" value={bill.price} placeholder="₡" onChange={handlePriceChange}/>
                        
                    </div>

                    <div className="form-group group-select">
                        <label>Area de Facturación</label>
                        <div className='btn-select'>
                                <NavLink to="/area-controller" ><img src={moreOptions}></img></NavLink>
                        </div>
                        <div className='clearfix'></div>
                        <div className='first-select '> 

                            <label>Gastos</label>
                            <select value = {bill.area} onChange={handleAreaChange} >
                                <option value="">Seleccione una area</option>
                                {
                                    areas.map((area, i) => {
                                        if(area.area_type===AREA_TYPE_OUTCOME)
                                        return(<option key ={i} value={area.id}>{area.name}</option> );
                                    })
                                }
                            </select>  
                        </div>

                        <div className='second-select '>   
                        
                            <label>Ingresos</label>
                            <select value = {bill.area} onChange={handleAreaChange} >
                                <option value="">Seleccione una area</option>
                                {
                                    areas.map((area, i) => {
                                        if(area.area_type===AREA_TYPE_INCOME)
                                        return(<option key ={i} value={area.id}>{area.name}</option> );
                                    })
                                }
                            </select> 
                        </div> 
                        
                    
                        
                    </div> {/*Fin del Div del Select Group*/}
                    
                    
                    <div className="form-group">
                        
                        <label>Descripcion</label>
                        <textarea name="description" value={bill.description} onChange={handleDescriptionChange} ></textarea>

                    </div>

                    <div className="bill-list ">
                        <label>Fecha Emision</label>
                        <input
                            type="date"
                            value={bill.date_created}
                            onChange={handleDateCreatedChange}/>
        
                    </div>

                    <div className="bill-list ">
                        <label>Fecha de Pago Estimada</label>
                        <input
                            type="date"
                            value={bill.date_expired}
                            onChange={handleDateExpiredChange}/>
        
                    </div>

                    

                    {/*Muestra botones de guardar ó Confirmar guardado si los datos son correctos*/}
                    {goSend === false ?
                        <div>
                            <div className="clearfix"></div>
                            <input type="button" value="Guardar" className="btn btn-success" onClick={send} />  
                            <NavLink to="/home" className="btn btn-cancel"  >Cancelar</NavLink> 
                        </div>
                    :
                    goSend === true &&
                        <BtnConfirm
                            object={bill}
                            objectType="bills"
                            typeConfirm="save"
                            origin="/crear-facturas" 
                            noSend= {noSend}      
                        />
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

            </div>
                                
            

        {/*End Div BillMacker*/}
        </div> 
            <SideBar/>  
        </div>
    );                            

}
export default BillMacker;

