import React, {Component} from 'react';

// Componente Encargado de generar un elemento en la lista (Orlando)

class BillOnList extends Component{
    
    //Construye el objeto factura con los props
    constructor(props){
        super(props);

        this.state ={
            bill:{
                id: 0,
                bill_ref: 0,
                name: '',
                price: 0,
                area: '',
                date_created: '',
                date_expired: '',
                description: ''

            },
            estado : 0
        }   
    }

   
    edit = (event) =>{
        const {bill}=this.state;
        bill.date_expired = event.target.value;
        this.setState({bill});
        this.props.listChange('Prueba'); //Se debería de enviar la nueva factura a actualizar                         
    }
    
    componentDidMount=()=>{
        this.setState({bill:this.props.bill});
        
    }


    
    render(){
        return(    
            <tbody>   
                {/*Crea la fila con los Datos enviados por Props*/}
                <tr>
                    
                    <td>
                        {this.state.bill.bill_ref}
                    </td>
                    
                    <td>
                        {this.state.bill.name}
                    </td>
                    
                    <td>
                        {`₡ ${this.state.bill.price}`}
                    </td>
                    
                    <td>
                        {this.state.bill.area}
                    </td>
                    
                    <td>
                        {this.state.bill.date_created}
                    </td>
                    <td >
                        <input type='date' value={this.state.bill.date_expired} onChange={this.edit}/>
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