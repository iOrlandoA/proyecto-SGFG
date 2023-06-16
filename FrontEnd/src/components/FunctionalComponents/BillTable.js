import React, { useEffect } from 'react';
import BillOnList from '../FunctionalComponents/BillOnList';

const BillTable = ({ bills }) => {
  
    useEffect(() => {
   
  }, []);

  const listChange = (datos) => {
    console.log(datos);
  };

  const generateList = () => {
    try {
      return bills.map((bill, i) => (
        <BillOnList key={i} bill={bill} listChange={listChange} />
      ));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div id='list'>
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
