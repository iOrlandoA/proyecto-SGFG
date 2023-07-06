import React, { useState, useEffect } from 'react';
import Slider from '../BasePageComponents/Slider';
import BillTable from './BillTable';
import GetData from '../FunctionalComponents/GetData';
import { useParams } from 'react-router-dom';


const AccountReport = () => {

    // Generate States for all variables
    const params = useParams();

    const [bills, setBills] = useState([{

        area:[]
    }]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [areaType, setAreaType]= useState('');
    const [msg, setMsg]= useState('');


   const setSendMsg=()=>{
        if(params.area_type == 0){
            setMsg('Total por Cobrar');
        } else if(params.area_type == 1){
            setMsg('Total por Pagar');
        }
    }

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
    };

    // Get the date of the first day of month and the end day of month
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const x = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const y = new Date(x.getTime() - 1);
        const day = y.getDate();

        setDateStart(`${year}-${month.toString().padStart(2, '0')}-01`);
        setDateEnd(`${year}-${month.toString().padStart(2, '0')}-${day}`);
    };

    // Hanlder for the change of DateStart
    const handleDateStartChange = (event) => {
        setIsLoading(true);
        setDateStart(event.target.value);
        refresh();
    };

    // Hanlder for the change of DateEnd
    const handleDateEndChange = (event) => {
        setIsLoading(true);
        setDateEnd(event.target.value);
        refresh();
    };

    //Use Effect start the Date with the function
    useEffect(() => {
        setSendMsg();
        setIsLoading(true);
        getDate();
        setAreaType(params.area_type);
    }, []);

    

    // Return the loading state and gets the API data
    if (isLoading) {
        return (
        <div>
            <GetData req={`/bills/is_paid?start_date=${dateStart}&end_date=${dateEnd}&area_type=${areaType}`} setData={setData} />
            <Slider title="Cargando ..." size="slider-small" />
        </div>
        );
    }


    


    // Return the List of Bills
    return (
        <div>
            {areaType == 0 ?
                <Slider title="Reporte de Cuentas por Cobrar" size="slider-small" />
            : 
                <Slider title="Reporte de Cuentas por Pagar" size="slider-small" />
            }

            <div className="center">
            <h2 className="subheader"></h2>
            <div id='date-picker'>
                <label>Fecha Inicio</label>
                <input type="date" id="dateStart" value={dateStart} onChange={handleDateStartChange} />
            </div>
            <div id='date-picker'>
                <label>Fecha Fin</label>
                <input type="date" value={dateEnd} onChange={handleDateEndChange} />
            </div>
            <div className="clearfix"></div>

            
            <div className="bill-list" id="list">
                {/*Call component BillTable generate the FullTable*/}
                <BillTable bills={bills} msg={msg} /> 

            </div>
        
            </div>

        </div> //End of First div
    );
};





export default AccountReport;