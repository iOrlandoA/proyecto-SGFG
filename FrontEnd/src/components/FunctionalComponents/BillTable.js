import React, { useEffect, useState } from 'react';
import BtnConfirm from './BtnConfirm';
import BillOnList from '../FunctionalComponents/BillOnList';

const BillTable = ({ bills}) => {
  
  const [billEdited, setBillEdited]= useState();
  const [goUpdate, setGoUpdate]= useState(false);

  const listChange = (data) => {
    setBillEdited(data);
    setGoUpdate(true);
  };

  const generateList = () => {
    try {
      return bills.map((bill, i) => (
        <BillOnList key={i} billP={bill} listChange={listChange} />
      ));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const noSend=()=>{
    setGoUpdate(false);
    setBillEdited({});
    
  }


  return (
    <div id='list'>
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

        {generateList()}
      </table>
    </div>
  );
};

export default BillTable; 
