import React, { useState, useEffect } from 'react';
import Slider from '../BasePageComponents/Slider';
import BillTable from '../FunctionalComponents/BillTable';
import GetData from '../FunctionalComponents/GetData';


const BillAreaReport = () => {

    // Generate States for all variables
    const [bills, setBills] = useState([]);

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [area_id, setAreaId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [areas, setAreas]= useState();
    const AREA_TYPE_INCOME = 'Ingreso';
    const AREA_TYPE_OUTCOME = 'Gasto';


    // Usage function for get data from Api 
    const setData = (data) => {
        setBills(data);
        refresh();
    };

    const setDataAreas = (data) =>{
        setAreas(data);
        setIsLoading(false);
    }

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

    // Cambia cuando se selecciona una Area Nueva
    const handleAreaChange = (event) => {
        setIsLoading(true);
        setAreaId(event.target.value);
        refresh();
    }

    //Use Effect start the Date with the function
    useEffect(() => {     
        setIsLoading(true);
        getDate();
    }, []);

    // Return the loading state and gets the API data
    if (isLoading) {
        if(areas === undefined){
            return (
                <div>    
                    <GetData req={'/areas/visible'} setData={setDataAreas} />
                    <Slider title="Cargando ..." size="slider-small" />
                </div>
                
            );
        } if (area_id !== null){
            return (
                <div>
    
                    <GetData req={`/bills/date_area_filter?start_date=${dateStart}&end_date=${dateEnd}&area_id=${area_id}`} setData={setData} />
                    <Slider title="Cargando Facturas ..." size="slider-small" />
                    
                </div>
            );
               
        }
     
        
    }



    // Return the List of Bills
    return (
        <div>
            <Slider title="Reporte por Area" size="slider-small" />

            <div className="center">
                <h2 className="subheader"></h2>
                {/*Date Pickers*/}
                <div id='date-picker'>
                    <label>Fecha Inicio</label>
                    <input type="date" id="dateStart" value={dateStart} onChange={handleDateStartChange} />
                </div>
                <div id='date-picker'>
                    <label>Fecha Fin</label>
                    <input type="date" value={dateEnd} onChange={handleDateEndChange} />
                </div>
                <div className="clearfix"></div>

                {/* Select Area */}
                <div className="form-group group-select">
                   
                    <div className='first-select'> 

                        <label>Gastos</label>
                        <select value = {area_id} onChange={handleAreaChange} >
                            <option value="">Seleccione una area</option>
                            {
                                areas.map((area, i) => {
                                    if(area.area_type===AREA_TYPE_OUTCOME)
                                    return(<option key ={i} value={area.id}>{area.name}</option> );
                                })
                            }
                        </select>  
                    </div>
              
                    <div className='second-select' >   
                    
                        <label>Ingresos</label>
                        <select value = {area_id} onChange={handleAreaChange} >
                            <option value="">Seleccione una area</option>
                            {
                                areas.map((area, i) => {
                                    if(area.area_type===AREA_TYPE_INCOME)
                                    return(<option key ={i} value={area.id}>{area.name}</option> );
                                })
                            }
                        </select> 
                    </div> 
                </div>

                {/*Call component BillTable generate the FullTable*/}
                <div className="bill-list" id="list">
                    
                    {bills!=undefined &&
                        <BillTable bills={bills}  /> 
                    }
                </div>
        
            </div>

        </div> //End of First div
    );
};

export default BillAreaReport;