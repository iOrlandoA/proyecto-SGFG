import React, {useState, useEffect} from 'react';
import saveImg from '../../assets/images/icons/save.png';
import payImg from '../../assets/images/icons/pay.png';

// Componente Encargado de generar un elemento en la lista (Orlando)

function BillOnList({billP, listChange}) {

    //Genera objetos state cambiantes 
   
    const [bill, setBill]= useState({
        name : '',
        price : '',
        area : '',
        description : '',
        date_created : '',
        date_expired : '', 
        bill_ref: ''
    });
    const [areas, setAreas]= useState([]);
    const [edited, setEdited]= useState(false);

    // Cambia cuando se cambia el nombre
    const handleNameChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, name : event.target.value }
        } );
        setEdited(true);
    }

    const handleBillRefChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, bill_ref : event.target.value}
            });
            setEdited(true);
        }
    }

    const handlePriceChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            setBill ( prevBill => {
                return {...prevBill, price : event.target.value}
            });
            setEdited(true);
        }
    }

    // Cambia cuando se cambia la fecha de expiracion
    const handleDateExpiredChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, date_expired : event.target.value }
        } );
        setEdited(true);
    }

    // Cambia cuando se cambia la descripcion
    const handleDescriptionChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, description : event.target.value }
        } );
        setEdited(true);
    }

    const send = () => {
        setEdited(false);
        if(edited){
            listChange(bill);
        }
        
    }

    useEffect (() => {
        setBill(billP);
        
    }, []);

    return(    
        <tbody>   
            {/*Crea la fila con los Datos enviados por Props*/}
            <tr>
                
                <td>
                    <input type='number' value={bill.bill_ref} onChange={handleBillRefChange}/> 
                </td>
                
                <td>
                    <input type='text'  value={bill.name} onChange={handleNameChange}/>
                </td>
                
                <td>
                    <div className='edit'> 
                        <span> ₡ </span>     <input type='number'  value={bill.price} onChange={handlePriceChange}/>
                    </div>
                </td>
                
                <td>
                    {bill.area}
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
                <a onClick={send} ><img src={saveImg} alt='save' /></a>
                <a  ><img src={payImg} alt='pay'/></a>
                
            </tr> 
            
        </tbody>
    );

}
export default BillOnList;

