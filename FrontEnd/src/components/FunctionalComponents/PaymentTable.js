import React, {useState, useEffect} from 'react';
import BtnConfirm from './BtnConfirm';
import PaymentOnList from './PaymentOnList';

function PaymentTable({payments, total, loading, bill}) {
    const [paymentEdited, setPaymentEdited]= useState({});
    const [goUpdate, setGoUpdate]= useState(false);
    const [totalPaid, setTotalPaid] = useState(0);
    const [billUpdated, setBillUpdated]= useState({
        full_paid:false
    });
    
    

    // Get BILL Data
    const listChange = (data) =>{
        setPaymentEdited(data);
        setGoUpdate(true);
    }


    //Clean Data 
    const noSend=()=>{
        setGoUpdate(false);
        setPaymentEdited({});
        setTotalPaid(0);
        sumOfPaid();
        loading(true);
        
    }  

    //Generate list of payments
    const generateList=()=>{


        try {
            return   payments.map((payment, i) => (
                <PaymentOnList paymentP={payment}  listChange={listChange}/>
            ));
        } catch (error) {
        }

    }
    // Sum all payments of the bill
    const sumOfPaid=()=>{
        try {
            const totalP = payments.reduce((accumulator, payment) => {
                return accumulator + payment.amount;
                }, 0);
            setTotalPaid(totalP);

            if(total === totalP){
                updateBill(true);
            }else if(total <= totalP){
                updateBill(false);
            }
        } catch (error) {
        }
        
    }

    //Mounting this component 
    useEffect( ()=>{
        
        sumOfPaid();
        
        
    },[]);

    useEffect(()=>{
        
        if(billUpdated.id !== undefined){
            console.log(billUpdated);
            goUpdateBill();
        }
        
    },[billUpdated]);

    const updateBill =(e)=>{
        setBillUpdated(bill);
        setBillUpdated ( prev => {
            return {...prev, full_paid : e }
        } ); 
    } 
    // No funciona
    const goUpdateBill=()=>{
        return(
            
            <BtnConfirm
                object={{billUpdated}}
                objectType="bills"
                typeConfirm="refresh"
                noSend= {noSend} 
                id = {billUpdated.id}     
            /> 
           
        );
    }
    


    return(
        <div>
            {/*Show Btn to Confirm Changes*/}
            {
                goUpdate && 
                <BtnConfirm
                    object={paymentEdited}
                    objectType="payments"
                    typeConfirm="update"
                    noSend= {noSend} 
                    id = {paymentEdited.id}     
                />
            }
            

            {/*Show history Payments*/}    
            {
                payments.length != 0 ?
                <div>
                    
                    <table id='table'> 
                        <thead>
                        <tr>
                            <th>Comprobante</th>
                            <th>Fecha Emisión</th>
                            <th>Monto</th>
                        </tr>
                        </thead>
                            
                            {generateList()}
                        {total!=undefined &&
                            <tr>
                                <td style={{ border: 'none' }}></td>
                                <td style={{ border: 'none' }}></td>
                                <td>- {totalPaid}</td>
                                <td>= {total-totalPaid}</td>
                            </tr>
                        }
                        
                        
                    </table>

                </div>
                :
                <h1 className="subheader"> No posee Facturas ...</h1>
                
            }    
        </div>
    );

}
export default PaymentTable;