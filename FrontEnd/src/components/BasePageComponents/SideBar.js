import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Component generate a Side Bar for implement in all Pages

function SideBar ()  {
  const [billRef, setBillRef] = useState('');
  
  

  const handleBillRefChange = (event) => {
    if (!isNaN(event.target.value) === true) {
      setBillRef(event.target.value);
    }
  };

  return (
    <div>
      <aside id="sidebar">

        {/*Search Function*/}
        <div id="search" className="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra la Factura que buscas</p>
          
            <input type="text" value={billRef} name="search" onChange={handleBillRefChange} />
            {billRef!=='' &&
              <NavLink to={`/search/${billRef}`} className="btn btn-success" >Buscar</NavLink>
            }
           
        </div>
      </aside>
      <div className="clearfix"></div>
      
    </div>
  );
};

export default SideBar;
