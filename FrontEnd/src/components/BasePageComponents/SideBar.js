import React, { useState } from 'react';
import BillSearch from '../FunctionalComponents/BillSearch';

export const SearchContext = React.createContext(); 


function SideBar ()  {
  const [billRef, setBillRef] = useState('');
  const [goSend, setGoSend] = useState(false);
  
  
  const validate = () => {
    if (billRef !== '') {  
        setGoSend(true);
        
    }
  }

  const handleBillRefChange = (event) => {
    if (!isNaN(event.target.value) === true) {
      setBillRef(event.target.value);
    }
  };

  if(goSend===true){
    return(
            
        <SearchContext.Provider value={billRef}>
            <div className="clearfix"></div>
            <BillSearch/>       
        </SearchContext.Provider>
        
    ); 
  }
 

  return (
    <div>
      <aside id="sidebar">
        <div id="search" className="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra la Factura que buscas</p>
          
            <input type="text" value={billRef} name="search" onChange={handleBillRefChange} />
            <input type="button" value="Buscar" className="btn btn-success" onClick={validate}/>
          
        </div>
      </aside>
      <div className="clearfix"></div>
      
    </div>
  );
};

export default SideBar;
