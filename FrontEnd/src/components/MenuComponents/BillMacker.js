import React, {Component} from 'react';
import SideBar from '../BasePageComponents/SideBar';
import Slider from '../BasePageComponents/Slider';
import axios from 'axios';
import UseApi from '../FunctionalComponents/UseApi';
import { NavLink } from 'react-router-dom';



// Formulario con los campos para crear una factura (Orlando)

class BillMacker extends Component{
   
    apiUrl= "http://localhost:3000/api";
       
    state = {
        bill : {
               
            name : '',
            price : 0,
            area : '',
            description : '',
            date_created : '',
            date_expired : '', 
            voucher: 0
        },
        areas: {}
        
        
    };
    


    // Cambia cuando se cambia el nombre
    handleNameChange = (event) => {
        const {bill}= this.state;
        bill.name = event.target.value;
        this.setState({bill});
    }


    // Cambia cuando se cambia el Precio
    handlePriceChange = (event) => {
        const {bill}= this.state;
        bill.price = event.target.value;
        this.setState({bill});
    }

     // Cambia cuando se cambia el Comprobante
    handleVoucherChange = (event) => {
        const {bill}= this.state;
        bill.voucher = event.target.value;
        this.setState({bill});
    }


    // Cambia cuando se selecciona una Area Nueva
    handleAreaChange = (event) => {
        const {bill}= this.state;
        bill.area = event.target.value;
        this.setState({bill});
    }

    // Cambia cuando se cambia la Descripcion
    handleDescriptionChange = (event) => {
        const {bill}=this.state;
        bill.description = event.target.value;
        this.setState({bill});
    }


    // Cambia cuando se selecciona una Fecha Creacion Nueva
    handleDateCreatedChange = (event) => {
        const {bill}=this.state;
        bill.date_created = event.target.value;
        this.setState({bill});
        
    }
    // Cambia cuando se selecciona una Fecha Expiracion Nueva
    handleDateExpirationChange = (event) => {
        const {bill}=this.state;
        bill.date_expired = event.target.value;
        this.setState({bill});
    }

   
   
        


    componentDidMount = async()=>{
      
        axios.get(`${this.apiUrl}/areas`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{

            this.setState({
                areas: res.data,
                status: 'success'
            });
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
         
       
    }

    

    //Envia los datos a la API
    send =() =>{

        axios
            .post(`${this.apiUrl}/bills`, this.state.bill,{
                headers: {
                    'Accept': 'application/json', 
                }
            })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }
    

    // Genera un mensaje confirmación Datos de la Factura
    confirm = () =>{
        
        const confirmed = window.confirm('¿Estás seguro que deseas guardar está Factura?');
        
        this.send();

    }

    
    render(){

       
      
        return(
            <div id='bill-macker'>
                {/*Se introduce el Slider en pequeño*/}
                <Slider  
                    title="Crear Factura"
                    size="slider-small"/>  

                <div id="content" className="center">
                    
                    <h1 className="subheader"></h1>
                    <form className="mid-form">

                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text"  onChange={this.handleNameChange}/>
                        </div>

                        <div className="form-group">
                            <label>Comprobante</label>
                            <input type="number" onChange={this.handleVoucherChange}/>
                        </div>

                        <div className="form-group">
                            <label>Precio</label>
                            <input type="number" placeholder="₡" onChange={this.handlePriceChange}/>
                        </div>

                        <div className="form-group select">
                            {this.state.status === 'success' &&
                                <select value = {this.state.bill.area} onChange={this.handleAreaChange} >
                                    <option value="">Seleccione una opción</option>
                                    {
                                        this.state.areas.map((area, i) => {
                                           return(<option key ={i} value={area.area_type}>{area.area_type}</option> );
                                        })}
                                </select>
                            
                            }
                            
                        </div>
                        
                        <div className="form-group">
                            
                            <label>Descripcion</label>
                            <textarea name="description" onChange={this.handleDescriptionChange} ></textarea>

                        </div>

                        <div className="form-group">
                            <label>Fecha Emision</label>
                            <input
                                id="dateCreated"
                                type="date"
                                name="dateCreated" 
                                value={this.state.date_created}
                                onChange={this.handleDateCreatedChange}/>
            
                        </div>

                        <div className="form-group">
                            <label>Fecha de Pago Estimada</label>
                            <input
                                id="dateExpiration"
                                type="date"
                                name="dateExpiration"
                                value={this.state.date_expired}
                                onChange={this.handleDateExpirationChange}/>
            
                        </div>

                        <div className="clearfix"></div>
                        <input type="button" value="Guardar" className="btn btn-success" onClick={this.confirm}/>  
                        <NavLink to="/home" className="btn btn-cancel"  >Cancelar</NavLink> 
                        
                        

                    </form>

                </div>
                <SideBar/>                    
                

            {/*End Div BillMacker*/}
            </div> 
        );                            
    } 

    

}
export default BillMacker;

