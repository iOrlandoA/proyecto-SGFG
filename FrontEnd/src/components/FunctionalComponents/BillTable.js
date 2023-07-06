import React, { useEffect, useState } from 'react';
import BtnConfirm from './BtnConfirm';
import BillOnList from '../FunctionalComponents/BillOnList';

// Generate the Table of Bills CAN Recibe multiple or only one bills
const BillTable = ({ bills, msg}) => {
  //Generals Objects
  const [billEdited, setBillEdited]= useState();
  const [goUpdate, setGoUpdate]= useState(false);
  const [totalBills, setTotalBills] = useState(0);

  // Recibe changes from BillOnList
  const listChange = (data) => {
    setBillEdited(data);
    setGoUpdate(true);
  };

  // Generate the elements on table with BillOnList
  const generateList = () => {
    try {
      return bills.map((bill, i) => (
        <BillOnList key={i} billP={bill} listChange={listChange} />
      ));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  // CLEAN data and FINISH Send WorkFlow
  const noSend=()=>{
    setGoUpdate(false);
    setBillEdited({});
    
  }
  //Sum all Bills
  const sumOfBills=()=>{
    try {
        const total = bills.reduce((accumulator, bill) => {
            return accumulator + bill.price;
        }, 0);
        setTotalBills(total);
    } catch (error) {
    }
    
  }

  //Mounting this component 
  useEffect( ()=>{
    sumOfBills(); 
  },[]);


  return (
    <div id='list'>
      {/*Get the Button to CONFIRM CHANGES*/}
      {
        goUpdate && 
          <BtnConfirm
            object={billEdited}
            objectType="bills"
            typeConfirm="update"
            origin="noSend" 
            noSend= {noSend} 
            id = {billEdited.id}     
          />
      }
      {/*Show HEAD Of Table*/}
      <table id='table'> 
        <thead>
          <tr>
            <th>Numero Factura</th>
            <th>Proveedor/Cliente</th>
            <th>Area</th>
            <th>Fecha Creación</th>
            <th>Fecha Expiración</th>
            <th>Descripción</th>
            <th>Monto Total</th>
          </tr>
        </thead>

        {generateList()}


        {msg != undefined &&
          <tr>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td>= {totalBills}</td>
              <td style={{ border: 'none' }}>{msg}</td>
          </tr>
        }

      </table>
    {/*End OF Div*/}
    </div> 
  );
};

export default BillTable; 
