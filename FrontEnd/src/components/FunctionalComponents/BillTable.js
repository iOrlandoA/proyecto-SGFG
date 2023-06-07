import React, {Component} from 'react';
import BillOnList from '../FunctionalComponents/BillOnList';
// Componente Base en el cual Cargar HTML 
class BillTable extends Component{


    generateList = ()  =>{
        
        try {
            return this.props.bills.map((bill, i) => {
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

    listChange= (datos) =>{ //Mandar Factura en Put
        console.log(datos);
    }

    componentDidMount= ()=>{

    }

    
    render(){
        return(
            
            <div id='list'>
                {/*Parte de Titulos de la Tabla*/}      
                <table id="table" >
                <thead>
                    <tr>
                        <th>ID Factura</th>
                        <th>Comprobante</th>
                        <th>Nombre </th>
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
            

        );
    }
}
export default BillTable;