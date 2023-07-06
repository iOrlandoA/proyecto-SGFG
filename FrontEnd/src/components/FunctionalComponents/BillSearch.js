import React, { useState, useEffect , useRef} from 'react';
import BillTable from '../FunctionalComponents/BillTable';
import GetData from '../FunctionalComponents/GetData';
import arrowDown from '../../assets/images/icons/arrowDown.svg'; 
import { useParams } from 'react-router-dom';
import Slider from '../BasePageComponents/Slider';


// Component generate search Bills
function BillSearch  ()  {

    // Generate States for all variables
    const [bills, setBills] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const {bill_ref} = useParams();
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
        setBillRef(bill_ref);
    
    }, []);

    // CHANGE BILL_REF
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
            <Slider title="Cargando ..." size="slider-small" />
        </div>
        );
    }
    // Return the List of Bills
    return (
        <div>
            <Slider title="Buscador" size="slider-small" />
            <div className="center">
                
                <h2 className="subheader">Encuentra la Factura que buscas</h2>
                <div className="bill-list" id="list" >

                    <div id="search" className='mid-form'>
                        <p></p>
                        <p>Resultados Abajo</p> 
                        <img src={arrowDown} alt='arrow-down'></img>
                        <div className='clearfix'></div>
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