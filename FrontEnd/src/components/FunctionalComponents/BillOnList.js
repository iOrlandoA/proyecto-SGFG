import React, {Component} from 'react';

// Componente Encargado de generar un elemento en la lista (Orlando)

function BillOnList() {

    //Genera objetos state cambiantes 
   
    const [bill, setBill]= useState({
        name : '',
        price : '',
        area : '',
        description : '',
        date_created : '',
        date_expired : '', 
        bill_ref: ''
    });
    const [areas, setAreas]= useState([]);
    const [goSend, setGoSend]= useState(false);
    const [validationTest, setValidationTest]= useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cambia cuando se cambia el nombre
    const handleNameChange = (event) => {

        setBill ( prevBill => {
            return {...prevBill, name : event.target.value }
        } );
        
    }

}

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

   
    editDateExpired = (event) =>{
        const {bill}=this.state;
        bill.date_expired = event.target.value;
        this.setState({bill});
        this.props.listChange('Prueba'); //Se debería de enviar la nueva factura a actualizar                         
    }

    editBillRef = (event) => {
        const {bill}=this.state;
        bill.bill_ref = event.target.value;
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
                    <input type='number' value={this.state.bill.bill_ref} onChange={this.editBillRef}/> {this.state.bill.bill_ref}
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