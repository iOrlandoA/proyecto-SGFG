import React, {Component} from 'react';
import Slider from '../BasePageComponents/Slider';
import SideBar from '../BasePageComponents/SideBar';
import arrowDown from '../../assets/images/icons/arrowDown.svg'; 
import arrownUp from  '../../assets/images/icons/arrowUp.svg'; 
// Componente Base en el cual Cargar HTML 
class Home extends Component{
    
    state= {
        moneyIn:250000.0,
        moneyOut:300000.0,
        msgIncome: {
            do: false
        },
        msgOutcome: {
            do: false,
            msg:'',
            color: '',
            arrowDir: '',
                    
        },
        green : '#7ed171',
        red : '#c95d5d'

    }

    // Aqui se realizara el calculo de la diferencia porcentual de los Ingresos
    incomeCalc =()=>{
        var result = 0.0;
        var moneyIn=this.state.moneyIn;
        var moneyOut=this.state.moneyOut;
        if(moneyIn >= moneyOut){
            result = Math.abs(Math.round((100 * moneyOut) / moneyIn)-100);
            this.setState({
                msgIncome: {
                    msg:`+${result}%`,
                    color: this.state.green,
                    arrowDir: 'up',
                    do: true
                    
                }
            });
            
        }
        if(moneyIn < moneyOut){
            result = Math.abs(Math.round((100 * moneyIn) / moneyOut)-100);
            this.setState({
                msgIncome: {
                    msg:`-${result}%`,
                    color: this.state.red,
                    arrowDir: 'down',
                    do: true
                    
                }
            });
        }

        
    }
    // Aqui se realizara el calculo de la diferencia porcentual de los Gastos
    outcomeCalc =()=>{
        var result = 0.0;
        var moneyIn=this.state.moneyIn;
        var moneyOut=this.state.moneyOut;
        if( moneyOut >= moneyIn){
            result = Math.abs(Math.round((100 * moneyIn) / moneyOut)-100);
            this.setState({
                msgOutcome: {
                    msg:`+${result}%`,
                    color: this.state.green,
                    arrowDir: 'up',
                    do: true
                    
                    
                }
            });
        }
        if(moneyOut <=  moneyIn){
            result = Math.abs(Math.round((100 * moneyOut) / moneyIn)-100);
            this.setState({
                msgOutcome: {
                    msg:`-${result}%`,
                    color: this.state.red,
                    arrowDir: 'down',
                    do: true
                    
                    
                }
            });
        }

    }


    componentDidMount=()=>{
        this.outcomeCalc();
        this.incomeCalc();
    }

    render(){
        return(
            <div id='home'>
            
                {/*Aquí se genera la barra Slider que Divide el Header*/}
                <Slider
                    title="Inicio"
                    btn="Libro Bancos"
                    btnUrl="#"
                    size="slider-big"/>  
            
                
            
                <div className='center'>
                    <div id='content' >
                        <h1 className='subheader'>Inicio</h1>
                        
                        {/*Ingresos*/} 
                        <div className='dashboard' id='dash-content'>

                            <label id='labelincome'>Ingresos</label>

                            {/*Diferencias porcentuales*/}
                           
                            {this.state.msgIncome.do &&
                                <div>
                                    {this.state.msgIncome.arrowDir === 'down' ?
                                        <div className='diff-porcentual' style={{backgroundColor: this.state.msgIncome.color }}>
                                            <img src={arrowDown} alt='arrow-down'></img>
                                            <span>{this.state.msgIncome.msg}</span>
                                        </div>
                                        :
                                        <div className='diff-porcentual' style={{backgroundColor: this.state.msgIncome.color }}>
                                            <img src={arrownUp}  alt='arrow-up'></img>
                                            <span>{this.state.msgIncome.msg}</span>
                                        </div>
                                    }
                                </div>
                                
                            }
                                
                                
                           
                            
                        
                            <label id='labelmoney'>{`₡ ${this.state.moneyIn}`}</label>
                        
                        </div>

                        {/*Gastos*/} 
                        <div className='dashboard' id='dash-content'>

                            <label id='labeloutcome'>Gastos</label>
                            

                            {/*Diferencias porcentuales*/}
                            {this.state.msgOutcome.do &&
                                <div>
                                    {this.state.msgOutcome.arrowDir === 'down' ?
                                        <div className='diff-porcentual' style={{backgroundColor: this.state.msgOutcome.color }}>
                                            <img src={arrowDown} alt='arrow-down'></img>
                                            <span>{this.state.msgOutcome.msg}</span>
                                        </div>
                                        :
                                        <div className='diff-porcentual' style={{backgroundColor: this.state.msgOutcome.color }}>
                                            <img src={arrownUp}  alt='arrow-up'></img>
                                            <span>{this.state.msgOutcome.msg}</span>
                                        </div>
                                    }
                                </div>
                                
                            }
                                

                            <label id='labelmoney'>{`₡ ${this.state.moneyOut}`}</label>
                    
                        </div>
                    
                    </div>
                    
                    <SideBar/> 
                    {/*Divide la parte de arriba con el Footer*/}
                </div>
            </div>

        );
    }
}
export default Home;