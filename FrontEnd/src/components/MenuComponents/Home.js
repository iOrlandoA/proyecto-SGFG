import React, { useEffect, useState} from 'react';
import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
import arrowDown from '../../assets/images/icons/arrowDown.svg'; 
import arrownUp from  '../../assets/images/icons/arrowUp.svg'; 
import GetData from '../FunctionalComponents/GetData';
// Componente Base en el cual Cargar HTML 
function Home  (){
    
    const [moneyIn, setMoneyIn] = useState(0.0);
    const [moneyOut, setMoneyOut] = useState(0.0);
    const [msgIncome, setMsgIncome] = useState({
      do: false,
      msg: '',
      color: '',
      arrowDir: '',
    });
    const [msgOutcome, setMsgOutcome] = useState({
      do: false,
      msg: '',
      color: '',
      arrowDir: '',
    });
    const green = '#7ed171';
    const red = '#c95d5d';
    const [isLoading, setIsLoading] = useState(false);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');


  

    // Aqui se realizara el calculo de la diferencia porcentual de los Ingresos
    const incomeCalc =()=>{
        var result = 0.0;
        if(moneyIn >= moneyOut){
            result = Math.abs(Math.round((100 * moneyOut) / moneyIn)-100);
            setMsgIncome({
                
                msg:`+${result}%`,
                color: green,
                arrowDir: 'up',
                do: true
                    
                
            });
            
        }
        if(moneyIn < moneyOut){
            result = Math.abs(Math.round((100 * moneyIn) / moneyOut)-100);
            setMsgIncome({
                msg:`-${result}%`,
                color: red,
                arrowDir: 'down',
                do: true

            });
        }

        
    }
    // Aqui se realizara el calculo de la diferencia porcentual de los Gastos
    const outcomeCalc =()=>{
        var result = 0.0;
        if( moneyOut >= moneyIn){
            result = Math.abs(Math.round((100 * moneyIn) / moneyOut)-100);
            setMsgOutcome({
                
                msg:`+${result}%`,
                color: green,
                arrowDir: 'up',
                do: true

            });
        }
        if(moneyOut <=  moneyIn){
            result = Math.abs(Math.round((100 * moneyOut) / moneyIn)-100);
            setMsgOutcome({
               
                msg:`-${result}%`,
                color: red,
                arrowDir: 'down',
                do: true
                
                    
                
            });
        }

    }

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



    // Esto se realiza al montar un componente
    useEffect(()=>{
        getDate(); 
       setIsLoading(true);
        
    },[]);


     // Trae los datos de las Areas
     const setData = (data) =>{
        setMoneyIn(data.ingreso_price);
        setMoneyOut(data.gasto_price);
        outcomeCalc();
        incomeCalc();
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
        
    }
    
    if (isLoading) {
        return (
            <div>
            <GetData req={`/bills/sumbills_by_type?start_date=${dateStart}&end_date=${dateEnd}`} setData={setData} />
            <Slider title="Cargando ..." size="slider-small" />
            </div>
        );
    }
    
    return(
        <div id='home'>
        
            {/*Aquí se genera la barra Slider que Divide el Header*/}
            <Slider
                title="Inicio"
                btn="Facturas"
                btnUrl="/lista-facturas"
                size="slider-big"
            />  
        
            
        
            <div className='center'>
                <div id='content' >
                    <h1 className='subheader'>Inicio</h1>
                    
                    {/*Ingresos*/} 
                    <div className='dashboard' id='dash-content'>

                        <label id='labelincome'>Ingresos</label>

                        {/* Percentual Diff Calc */}
                        
                        {msgIncome.do &&
                            <div>
                                {msgIncome.arrowDir === 'down' ?
                                    <div className='diff-porcentual' style={{backgroundColor: msgIncome.color }}>
                                        <img src={arrowDown} alt='arrow-down'></img>
                                        <span>{msgIncome.msg}</span>
                                    </div>
                                    :
                                    <div className='diff-porcentual' style={{backgroundColor: msgIncome.color }}>
                                        <img src={arrownUp}  alt='arrow-up'></img>
                                        <span>{msgIncome.msg}</span>
                                    </div>
                                }
                            </div>
                            
                        }
                            
                            
                        
                        
                    
                        <label id='labelmoney'>{`₡ ${moneyIn}`}</label>
                    
                    </div>

                    {/*Gastos*/} 
                    <div className='dashboard' id='dash-content'>

                        <label id='labeloutcome'>Gastos</label>
                        

                        {/* Percentual Diff Calc */}
                        {msgOutcome.do &&
                            <div>
                                {msgOutcome.arrowDir === 'down' ?
                                    <div className='diff-porcentual' style={{backgroundColor: msgOutcome.color }}>
                                        <img src={arrowDown} alt='arrow-down'></img>
                                        <span>{msgOutcome.msg}</span>
                                    </div>
                                    :
                                    <div className='diff-porcentual' style={{backgroundColor: msgOutcome.color }}>
                                        <img src={arrownUp}  alt='arrow-up'></img>
                                        <span>{msgOutcome.msg}</span>
                                    </div>
                                }
                            </div>
                            
                        }
                            

                        <label id='labelmoney'>{`₡ ${moneyOut}`}</label>
                
                    </div>
                
                </div>
                
                <SideBar/> 
                {/*Divide la parte de arriba con el Footer*/}
            </div>
        </div>

    ); //End Return
    
}
export default Home;