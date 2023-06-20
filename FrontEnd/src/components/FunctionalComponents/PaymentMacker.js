import React, {useEffect, useState} from 'react';
import SideBar from '../BasePageComponents/SideBar';
import Slider from '../BasePageComponents/Slider';
import { NavLink, useParams } from 'react-router-dom';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';
import GetData from '../FunctionalComponents/GetData';


// Formulario con los campos para crear una pago 

function PaymentMacker (){
   const bill_id= useParams();
    //Genera objetos state cambiantes 
    const [payment, setPayment]= useState({
        bill_id : bill_id.id,
        amount : '',
        voucher : '',
        date_created : ''
    });
    const [bill, setBill]= useState({
        payments: []
    });
    const [goSend, setGoSend]= useState(false);
    const [validationTest, setValidationTest]= useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // Cambia cuando se cambia el nombre
   


    // Cambia cuando se cambia el Precio
    const handleAmountChange = (event) => {

        if (!isNaN(event.target.value)=== true){
            setPayment ( prevBill => {
                return {...prevBill, amount : event.target.value }
            } );
        }
       
    }

     // Cambia cuando se cambia el Comprobante
    const handleVoucherChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setPayment ( prevBill => {
                return {...prevBill, voucher : event.target.value }
            } );
        }    
    }



    // Cambia cuando se selecciona una Fecha Creacion Nueva
    const handleDateCreatedChange = (event) => {
        setPayment ( prevBill => {
            return {...prevBill, date_created : event.target.value }
        } );
        
    }
    

    //Realiza las validaciones para el correcto envío de Factura
    const send =()=>{
        setValidationTest([]);
        if ( payment.amount === '' || payment.voucher === '' || payment.dateCreated === "") 
        {
            if(payment.amount === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "amount", msg: "Monto vacío" }]);

            } 
            if(payment.voucher === ''){
                
                setValidationTest((prevState) => [...prevState, { type: "voucher", msg: "Numero Comprobante Vacío o Invalido" }]);
            } 
            if(payment.date_created === ''){
              
                setValidationTest((prevState) => [...prevState, { type: "date_created", msg: "Fecha Inicio Vacía" }]);
            } 
        }else{
            setGoSend(true);            
        }   
        
    }


    //No envía más y Borra los Datos
    const noSend=()=>{
        setGoSend(false);
        setPayment({  
            amount : '',
            voucher : '',
            date_created : ''
            
        });

        setTimeout(() => {
            setIsLoading(true);
        }, 400);

    }
        

    //Si se monto el Componentes
    useEffect( ()=>{
        setGoSend(false);
        setIsLoading(true);

    },[]);


    // Trae los datos de las Areas
    const setData = (data) =>{
        console.log(data);
        setBill(data.bill);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }

    //Genera la lista de Pagos
    const getPayments=()=>{

        try {
            return   bill.payments.map((payment, i) => (
                <tr>
                    <td>
                        <p>{payment.voucher}</p>
                    </td>                
                    
                    <td>
                        <p>₡{payment.amount}</p>
                    </td> 
                    
                    <td>
                        <p>{payment.date_created}</p>
                    </td>

                </tr>
        ));
        } catch (error) {
            console.error('Error:', error.message);
        }

    }

     // Return the loading state and gets the API data
    if (isLoading) {
        
        return (
            <div>
                <GetData req={ `/bills/${bill_id.id}`} setData={setData} />
                <h1 className="subheader">Cargando...</h1>
            </div>
        );
    }
      
    return(
        <div>
        <div id='bill-macker'>
            {/*Se introduce el Slider en pequeño*/}
            <Slider  
                title="Crear Pago"
                size="slider-small"/>  

            <div id="content" className="center">
                
                
                <form className="mid-form">
                    


                    <br/>
                    
                    <h1 className="subheader"> Creación de Pago</h1>

                    <div className="form-group">
                        <label>Numero Comprobante</label>
                        <input type="number" value={payment.voucher} onChange={handleVoucherChange}/>
                    </div>


                    <div className="form-group">
                        <label>Monto </label>
                        <input type="number" value={payment.amount} placeholder="₡" onChange={handleAmountChange}/>
                        
                    </div>

                    
                    <div className="bill-list ">
                        <label>Fecha Emision</label>
                        <input
                            type="date"
                            value={payment.date_created}
                            onChange={handleDateCreatedChange}/>
        
                    </div>
                    

                    {/*Muestra botones de guardar ó Confirmar guardado si los datos son correctos*/}
                    {goSend === false ?
                        <div>
                            <div className="clearfix"></div>
                            <input type="button" value="Guardar" className="btn btn-success" onClick={send} />  
                            <NavLink to="/" className="btn btn-cancel"  >Cancelar</NavLink> 
                        </div>
                    :
                    goSend === true &&
                        <BtnConfirm
                            object={payment}
                            objectType="payments"
                            typeConfirm="save"
                            origin="/" 
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



                <h1 className="subheader"> Datos de la Factura</h1>
                <table id='table'> 
                    <thead>
                    <tr>
                        <th>Numero Factura</th>
                        <th>Proveedor/Cliente</th>
                        <th>Monto Total</th>
                        <th>Area</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Expiración</th>
                        <th>Descripción</th>
                    </tr>
                    </thead>


                    <tbody>   
                        <tr>
                            
                            <td>
                                <p>{bill.bill_ref}</p>
                            </td>
                            
                            <td>
                                <p>{bill.name}</p>
                            </td>
                            
                            <td>
                                <p>₡{bill.price}</p>
                            </td>
                            
                            <td>
                                {bill.area}
                            </td>
                            
                            <td>
                                {bill.date_created}
                            </td>
                            <td >
                                <p>{bill.date_expired}</p> 
                            </td>
                            <td>
                                <p>{bill.description} </p>
                            </td>    
                        </tr> 
                        
                    </tbody>

            
                </table>





                {
                    bill.payments.length != 0 &&
                    <div>
                        <h1 className="subheader"> Historial de Pago</h1>
                        <table id='table'> 
                            <thead>
                            <tr>
                                <th>Comprobante</th>
                                <th>Monto</th>
                                <th>Fecha Emisión</th>

                            </tr>
                            </thead>


                            <tbody>   
                                {getPayments()}
                                
                            </tbody>
        
                    
                        </table>
                    </div>
                }    
                


            </div>
                                
            

        {/*End Div BillMacker*/}
        </div> 
            
        </div>
    );                            

}
export default PaymentMacker;