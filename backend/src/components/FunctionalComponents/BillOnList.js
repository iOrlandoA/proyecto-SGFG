import React, {Component} from 'react';
// Componente Encargado de generar un elemento en la lista
class BillOnList extends Component{
    render(){
        // Lee el Prop en una constante
        const {
            facturaId,
            type,
            name,
            price,
            areaTransaction,
            description,
            dateCreated,
            dateExpiration 
        }= this.props.bill;
        
        return(
            //Crea la fila con los Datos enviados por Props
            <tr className='table-rode' key={facturaId}>
                <td>{facturaId}</td>
                <td>{type}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{areaTransaction}</td>
                <td>{dateCreated}</td>
                <td>{dateExpiration}</td>
                <td>{description}</td>
            </tr>

        );
    }
}
export default BillOnList;