import React, {Component} from 'react';
// Componente Encargado de generar un elemento en la lista
class BillOnList extends Component{
    
    //Construye el objeto factura con los props
    constructor(props){
        super(props);

        this.state ={
            bill:this.props.bill,
            estado : 0
        }   
    }

   
    edit = (event) =>{
        const {bill}=this.state;
        bill.dateExpiration = event.target.value;
        this.setState({bill});
        this.props.listChange('Prueba'); //Se debería de enviar la nueva factura a actualizar                         
    }
    

    hideDescription= () =>{
        var div = document.getElementById("description");
        
    }

    
    render(){
        return(    
            <tbody>   
                {/*Crea la fila con los Datos enviados por Props*/}
                <tr className='table-rode' >
                    <td>{this.state.bill.facturaId}</td>
                    <td>{this.state.bill.type}</td>
                    <td>{this.state.bill.name}</td>
                    <td>{this.state.bill.price}</td>
                    <td>{this.state.bill.areaTransaction}</td>
                    <td>{this.state.bill.dateCreated}</td>
                    <td >
                        <input type='date' value={this.state.bill.dateExpiration} onChange={this.edit}></input>
                    </td>
                    <td>
                        <div className='descriptionCell' >
                            {this.state.bill.description}
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }
}
export default BillOnList;