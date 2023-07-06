import React, {useState, useEffect} from 'react';
import saveImg from '../../assets/images/icons/save.svg';
import payImg from '../../assets/images/icons/pay.svg';
import { NavLink} from 'react-router-dom';

// Component generate elemento of table Bills 

function BillOnList({billP, listChange}) {

    //General Objets
   
    const [bill, setBill]= useState({
        name : '',
        price : '',
        area : '',
        description : '',
        date_created : '',
        date_expired : '', 
        bill_ref: ''
    });
    const [edited, setEdited]= useState(false);
    

    // CHANGE NAME
    const handleNameChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, name : event.target.value }
        } );
        setEdited(true);
    }
    // CHANGE BILL_REF
    const handleBillRefChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, bill_ref : event.target.value}
            });
            setEdited(true);
        }
    }

    //CHANGE PRICE
    const handlePriceChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, price : event.target.value}
            });
            setEdited(true);
        }
    }

    // CHANGE DATE_EXPIRED
    const handleDateExpiredChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, date_expired : event.target.value }
        } );
        setEdited(true);
    }

    // CHANGE DESCRIPTION
    const handleDescriptionChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, description : event.target.value }
        } );
        setEdited(true);
    }


    // Send changes to TABLE for get a  CONFIRM BUTTON on TOP
    const send = () => {
        setEdited(false);
        if(edited){
            listChange(bill);
        }
        
    }

    // On mount Component 
    useEffect (() => {
        setBill(billP);
        
    }, []);


    return(    
        <tbody>   
            {/*Crea la fila con los Datos enviados por Props*/}
            <tr>
                
                <td id='idSpace'>
                    <input type='number' value={bill.bill_ref} onChange={handleBillRefChange}/> 
                </td>
                
                <td id='nameSpace'>
                    <input type='text'  value={bill.name} onChange={handleNameChange}/>
                </td>
                
                
                <td>
                    <p>{bill.area.area_type}: 
                    <br/>
                    {bill.area.name}</p>
                </td>
                
                <td>
                    {bill.date_created}
                </td>
                <td >
                    <input type='date' value={bill.date_expired} onChange={handleDateExpiredChange}/>
                </td>
                <td>
                    <textarea className='descriptionCell' value={bill.description} onChange={handleDescriptionChange}/>   
                </td>

                <td id='amountSpace'>
                    <div className='edit'> 
                        <span> ₡ </span>     <input type='number'  value={bill.price} onChange={handlePriceChange}/>
                    </div>
                </td>
                
                <a onClick={send} ><img src={saveImg} alt='save' /></a>
                <NavLink to={`/crear-pago/${bill.id}` }> <img src={payImg} alt='pay'/> </NavLink>
                
               
               
                
            </tr> 
            
        </tbody>
    );
   

}
export default BillOnList;

