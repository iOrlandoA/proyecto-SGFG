import React, {useState, useEffect} from 'react';

function PaymentOnList({billP, listChange}) {

    const [payment, setPayment]= useState({
        bill_id : bill_id.id,
        amount : '',
        voucher : '',
        date_created : ''
    });
    const [edited, setEdited]= useState(false);

    // Cambia cuando se cambia el Precio
    const handleAmountChange = (event) => {

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

    return(
        <tr>
            <td>
                <input type='number' value={payment.voucher} onChange={handleVoucherChange}/>
            </td>                
            
            <td>
                <div className='edit'>
                    <span> ₡ </span><input type='number' value={payment.amount} onChange={handleAmountChange}/><p>₡{payment.amount}</p>
                </div>
            </td> 
            
            <td>
                <input type='date' value={payment.date_created} onChange={handleDateCreatedChange}/>
            </td>

        </tr>
    );

}
export default PaymentOnList;