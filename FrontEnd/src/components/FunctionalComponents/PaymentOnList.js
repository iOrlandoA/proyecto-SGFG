import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import GetData from '../FunctionalComponents/GetData';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';
import saveImg from '../../assets/images/icons/save.svg';

function PaymentOnList() {

    const bill_id = useParams();

    const [payments, setPayments]= useState(false);

    const [payment, setPayment]= useState({
        bill_id : bill_id.id,
        amount : '',
        voucher : '',
        date_created : ''
    });
    const [bill, setBill]= useState({
        payments: [],
        area:[]
    });
    const [edited, setEdited]= useState(false);
    const [goSend, setGoSend]= useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Cambia cuando se cambia el Precio
    const handleAmountChange = (event) => {
        console.log(event.target.value)
        if (!isNaN(event.target.value)=== true){
            setPayment ( prevBill => {
                return {...prevBill, amount : event.target.value }
            } );
            setEdited(true);
        }
       
    }

     // Cambia cuando se cambia el Comprobante
    const handleVoucherChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setPayment ( prevBill => {
                return {...prevBill, voucher : event.target.value }
            } );
            setEdited(true);
        }    
    }

    // Cambia cuando se selecciona una Fecha Creacion Nueva
    const handleDateCreatedChange = (event) => {
        setPayment ( prevBill => {
            return {...prevBill, date_created : event.target.value }
        } );
        setEdited(true);
    }

    // Get BILL Data
    const setData = (data) =>{
        console.log(data.bill.payments);
        setBill(data.bill);
        setPayments(data.bill.payments)
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }

    const send =()=>{
        setGoSend(true);
    }

    //Clean Data and Refresh the Page
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

    //Mounting this component 
    useEffect( ()=>{
        setGoSend(false);
        setIsLoading(true);

    },[]);

    // Return the loading state and gets the API data
    if (isLoading) {
        
        return (
            <div>
                <GetData req={ `/bills/${bill_id.id}`} setData={setData} />
                <h1 className="subheader">Cargando...</h1>
            </div>
        );
    }

    //Generata list of payments
    const getPayments=()=>{

        try {
            return   payments.map((payment, i) => (
                <tbody>
                    <tr>
                        <td>
                            <input type='number' value={payment.voucher} onChange={handleVoucherChange}/>
                        </td>              
                        <td>
                            <input type='date' value={payment.date_created} onChange={handleDateCreatedChange}/>
                        </td>
                        <td>
                            <div className='edit'>
                                <span> ₡ </span><input type='number' value={payment.amount} onChange={handleAmountChange}/>
                            </div>
                        </td>
                        
                    </tr>
                    <a onClick={send} ><img src={saveImg} alt='save' id='icon' /></a>
                </tbody>
        ));
        } catch (error) {
            console.error('Error:', error.message);
        }

    }

    return(
        <div>


            {/* Show Data of Bill*/}
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
                            {bill.area.area_type}-{bill.area.name}
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
            {/*Show history Payments*/}    
            {
                    bill.payments.length != 0 &&
                    <div>
                        <h1 className="subheader"> Historial de pagos de la factura</h1>
                        <table id='table'> 
                            <thead>
                            <tr>
                                <th>Comprobante</th>
                                <th>Fecha Emisión</th>
                                <th>Monto</th>
                            </tr>
                            </thead>
                               
                                {getPayments()}
                    
                        </table>
                    </div>
                }    
        </div>
    );

}
export default PaymentOnList;