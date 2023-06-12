import React, { useEffect, useState} from 'react';
import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
import arrowDown from '../../assets/images/icons/arrowDown.svg'; 
import arrownUp from  '../../assets/images/icons/arrowUp.svg'; 
// Componente Base en el cual Cargar HTML 
function Home  (){
    
    const [moneyIn, setMoneyIn] = useState(250000.0);
    const [moneyOut, setMoneyOut] = useState(300000.0);
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

    // Esto se realiza al montar un componente
    useEffect(()=>{
        outcomeCalc();
        incomeCalc();
        
    },[]);
    

    
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