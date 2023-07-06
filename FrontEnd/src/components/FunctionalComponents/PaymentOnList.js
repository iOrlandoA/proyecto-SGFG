import React, {useState, useEffect} from 'react';
import saveImg from '../../assets/images/icons/save.svg';

function PaymentOnList({paymentP, listChange}) {
   
    const [payment, setPayment]= useState({
        id: '',
        amount : '',
        voucher : '',
        date_created : ''
    });
   
    const [edited, setEdited]= useState(false);
    const [isLoading, setIsLoading]= useState(true);
    const [validationTest, setValidationTest]= useState([]);
    const [goSend, setGoSend]= useState(false);

    // Cambia cuando se cambia el Precio
    const handleAmountChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setPayment ( prev => {
                return {...prev, amount : event.target.value }
            } );
            setEdited(true);
        }
       
    }

     // Cambia cuando se cambia el Comprobante
    const handleVoucherChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setPayment ( prev=> {
                return {...prev, voucher : event.target.value }
            } );
            setEdited(true);
        }    
    }

    // Cambia cuando se selecciona una Fecha Creacion Nueva
    const handleDateCreatedChange = (event) => {
        setPayment ( prev => {
            return {...prev, date_created : event.target.value }
        } );
        setEdited(true);
    }

    // Send to Payment Table the Payment Edited to confirm the changes
    const send =()=>{
        setValidationTest([]);
        setGoSend(false);
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
        
        if(goSend){
            listChange(payment);
        }
        setEdited(false);

    }
    


    //Mounting this component 
    useEffect( ()=>{
       
        setPayment(paymentP);
        setIsLoading(false);

    },[]);
    if(isLoading){
        return(<p>Cargando...</p>);
    }
    return(
        
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
                <a onClick={send} ><img src={saveImg} alt='save' id='icon' /></a>
            </tr>
            
        </tbody>
        
    );

}
export default PaymentOnList;