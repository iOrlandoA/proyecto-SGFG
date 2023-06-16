import React, { useState, useEffect , useContext, useRef} from 'react';
import BillTable from '../FunctionalComponents/BillTable';
import GetData from '../FunctionalComponents/GetData';
import { SearchContext } from '../BasePageComponents/SideBar';
import arrowDown from '../../assets/images/icons/arrowDown.svg'; 

function BillSearch  ()  {

    // Generate States for all variables
    const [bills, setBills] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(SearchContext);
    const [billRef, setBillRef] = useState('');
    const inputRef = useRef(null);
    
    // Usage function for get data from Api 
    const setData = (data) => {
        setBills(data);
        refresh();
    };

    //Give a chance for refresh the page
    const refresh = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };



    //Use Effect start the Date with the function
    useEffect(() => {
        setIsLoading(true);
        setBillRef(context);

    }, []);

    const handleBillRefChange = (event) => {
        if (!isNaN(event.target.value) === true) {
          setBillRef(event.target.value);
        }
    };
    
    

    // Return the loading state and gets the API data
    if (isLoading) {
        return (
        <div>
            <GetData req={`/bills?bill_ref=${billRef}`} setData={setData} />
            <h1 className="subheader">Cargando...</h1>
        </div>
        );
    }
    // Return the List of Bills
    return (
        <div>
            <div className="center">
                
                <h2 className="subheader"></h2>
                <div className="bill-list" id="list" >

                    <div id="search" className='mid-form'>
                        <h3>Buscador</h3>
                        <p>Encuentra la Factura que buscas</p>
                        <p>Resultados Abajo</p> 
                        <img src={arrowDown} alt='arrow-down'></img>
                        
                        <input type="text" ref={inputRef} value={billRef} name="search" onChange={handleBillRefChange} />
                        <input type="button" ref={inputRef}  value="Buscar" className="btn btn-success" onClick={()=>{setIsLoading(true)}} />
                
                    </div>

                    {/*Call component BillTable generate the FullTable*/}
                    <BillTable bills={bills} /> 

                    

                </div>


                
                
        
            </div>

        </div> //End of First div
    );
};

export default BillSearch;