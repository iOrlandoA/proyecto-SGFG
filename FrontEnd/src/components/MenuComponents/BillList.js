import React, {Component} from 'react';
import BillOnList from '../FunctionalComponents/BillOnList';
import Slider from '../BasePageComponents/Slider';
import axios from 'axios';

// Componente encargado de crear la Lista de Facturas  (Orlando)


class BillList extends Component{
    //Datos de Prueba borrar a futuro
    state ={
        bills:[],
        dateStart : '',
        dateEnd : ''

    }

    
    componentDidMount = async()=>{

        
        
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


    listChange= (datos) =>{
        console.log(datos);
    }
    


    //Genera la lista a mostrar (Aprueba de Fallos)
    generateList=() =>{
        
        try {
            return this.state.bills.map((bill, i) => {
              return (
                //Llama al componente que genera cada fila (Manda Key y Factura)
                <BillOnList 
                    key= {i}
                    bill= {bill}
                    listChange= {this.listChange}
                />
              );
            });
          } catch (error) {
            console.error('Error:', error.message);
          }
    }

    // Cambia cuando se selecciona una Fecha Inicio Nueva
    handleDateStartChange = (event) => {
        this.setState({dateStart : event.target.value});
    }

    // Cambia cuando se selecciona una Fecha Fin Nueva
    handleDateEndChange = (event) => {
        
        this.setState({dateEnd:event.target.value});
        
    }
    

    render(){
        return(
            <div className='center'>

                {/*Se introduce el Slider en pequeño*/}
                <Slider
                    title="Lista Facturas"
                    size="slider-small"
                />

                <h2 className='subheader'></h2>

                {/*Se muestran inputs de Fechas*/}
                <div className="bill-list" >
                    <label>Fecha Inicio</label>
                    <input
                        type="date" 
                        value={this.state.dateStart}
                        onChange={this.handleDateStartChange}/>
                
                    <label>Fecha Fin</label>
                    <input 
                        type="date"
                        value={this.state.dateEnd}
                        onChange={this.handleDateEndChange}/>
                    <div className="clearfix"></div> 


                    {/*Parte de Titulos de la Tabla*/}      
                    <table id="table" >
                        <thead>
                            <tr>
                                <th>ID Factura</th>
                                <th>Tipo Transacion</th>
                                <th>Nombre </th>
                                <th>Comprobante</th>
                                <th>Precio</th>
                                <th>Area </th>
                                <th>Fecha Creación</th>
                                <th>Fecha Expiración </th>
                                <th>Descripción</th>
                            </tr>
                        </thead>

                        {/*Aqui se llama al Metodo que Genera la Lista*/}
                        {this.generateList()}

                    </table>
                </div>

                {/*Fin del Div de Bill List*/}
            </div>
            
            
        );
    }
}
export default BillList;