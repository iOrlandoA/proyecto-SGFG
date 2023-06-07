import React, {Component} from 'react';
import Slider from '../BasePageComponents/Slider';
import axios from 'axios';
import BillTable from '../FunctionalComponents/BillTable';

// Componente encargado de crear la Lista de Facturas  (Orlando)


class BillList extends Component{
    apiUrl= "http://localhost:3000/api";
    

    constructor(props){
        super(props);
        this.state ={
            bills:[{}],
            dateStart : '1999-01-20',
            dateEnd : '1999-01-20',
            isLoading: true
    
    
        }
    }
   
    

    getBills = ()=>{
        axios.get(`${this.apiUrl}/bills`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{

            this.setState({
                bills: res.data,
                status: 'success'
            });
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
         
    }

    getDate=()=>{
        // Obtiene la hora actual
        var today= new Date();
        var month = today.getMonth() + 1; 
        var year = today.getFullYear();
        
        // Obtener el primer día del próximo mes
        const x = new Date(today.getFullYear(), today.getMonth() + 1, 1);

        // Restar un día al primer día del mes siguiente
        const y = new Date(x.getTime() - 1);
        var day= y.getDate();
        // Guardar el estado
        this.setState({dateStart:`${year}-${month.toString().padStart(2, '0')}-01`});
        this.setState({dateEnd:`${year}-${month.toString().padStart(2, '0')}-${day}`});
    }
    // Antes de que se monte
    componentDidMount =async() =>{
        this.getBills();
        this.getDate();
        
        

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000); 
        
    }

    

    // Cambia cuando se selecciona una Fecha Inicio Nueva
    handleDateStartChange = (event) => {
        this.setState({dateStart : event.target.value});
        console.log(this.state.dateStart);
    }

    // Cambia cuando se selecciona una Fecha Fin Nueva
    handleDateEndChange = (event) => {
        
        this.setState({dateEnd:event.target.value});
        
    }
    

    render(){
        
        if(this.state.isLoading===true){
            return(<h1 className='subheader'> Cargando...</h1>);

        }
        
        return(
            
            <div >

                {/*Se introduce el Slider en pequeño*/}
                <Slider
                    title="Lista Facturas"
                    size="slider-small"
                />
                <div className='center' >
                    <h2 className='subheader'></h2>

                    {/*Se muestran inputs de Fechas*/}
                    <div className="bill-list"  id='list'>
                        <label>Fecha Inicio</label>
                        <input
                            type="date" 
                            value={this.state.dateStart}
                            onChange={this.handleDateStartChange}
                        />
                    
                        <label>Fecha Fin</label>
                        <input 
                            type="date"
                            value={this.state.dateEnd}
                            onChange={this.handleDateEndChange}
                        />
                        
                        <div className="clearfix"></div> 
                        
                        <BillTable
                            bills= {this.state.bills}
                        />
                    {/*Fin del Div de Bill List*/}   
                    </div>

                {/*Fin del Div de Center*/}    
                </div>
                
            </div>
            
        );
        
    }
}
export default BillList;