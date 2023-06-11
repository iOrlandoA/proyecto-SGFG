import React, {Component} from 'react';
import SideBar from '../BasePageComponents/SideBar';
import Slider from '../BasePageComponents/Slider';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import BtnConfirm from '../FunctionalComponents/BtnConfirm';



// Formulario con los campos para crear una factura (Orlando)

class BillMacker extends Component{
   
    apiUrl= "http://localhost:3000/api";
    
    //Genera objetos state cambiantes 
    state = {
        bill : {
               
            name : '',
            price : 0,
            area : '',
            description : '',
            date_created : '',
            date_expired : '', 
            bill_ref: 0
        },
        areas: {},
        goSend: false,
        validationTest: []
        
        
    };
    


    // Cambia cuando se cambia el nombre
    handleNameChange = (event) => {
        const {bill}= this.state;
        bill.name = event.target.value;
        this.setState({bill});
    }


    // Cambia cuando se cambia el Precio
    handlePriceChange = (event) => {

        if (!isNaN(event.target.value)=== true){
            const {bill}= this.state;
            bill.price = event.target.value;
            this.setState({bill});
        }
       
    }

     // Cambia cuando se cambia el Comprobante
    handleBillRefChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            const {bill}= this.state;
            bill.bill_ref = event.target.value;
            this.setState({bill});
        }    
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


    //Realiza las validaciones para el correcto envío de Factura
    send =()=>{
        this.setState({ validationTest: [] });
        if (this.state.bill.name === "" || this.state.bill.price === 0  || this.state.bill.price === null ||
            this.state.bill.area === "" || this.state.bill.dateCreated === "" ||  this.state.bill.bill_ref === 0  ) 
        {
            
            if(this.state.bill.name === ''){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"name", msg:"Nombre Vacío"}]
                }));
            } 
            if(this.state.bill.price === 0 || this.state.bill.price === null ){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"price", msg:"Precio Vacío o Invalido"}]
                }));
            }
            if(this.state.bill.area === '') {
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"area", msg:"Campo area Vacío"}]
                }));
            }
            if(this.state.bill.date_created === ''){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"date_created", msg: "Fecha Inicio Vacía"}]
                }));
            } 
            if(this.state.bill.bill_ref === 0){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest, {type:"bill_ref", msg: "Comprobante Vacío o Invalido"}]
                }));
            } 
            console.log(this.state.validationTest);
            
        }else{
            
            this.setState({goSend:true});
            
        }   
        
    }

    noSend=()=>{
        this.setState(
            {goSend:false}
        );

        this.setState(
            {bill : {
               
                name : '',
                price : 0,
                area : '',
                description : '',
                date_created : '',
                date_expired : '', 
                bill_ref: 0
            }}
        );
            


    }
        

    //Si se monto el Componentes
    componentDidMount = async()=>{

        this.setState({goSend:false});
        
        // Trae todas las areas desde la base de datos
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

   

    render(){


      
        return(
            <div>
            <div id='bill-macker'>
                {/*Se introduce el Slider en pequeño*/}
                <Slider  
                    title="Crear Factura"
                    size="slider-small"/>  

                <div id="content" className="center">
                    
                    <h1 className="subheader"></h1>
                    <form className="mid-form">

                        <div className="form-group">
                            <label>Proveedor/Cliente</label>
                            <input type="text" value={this.state.bill.name} onChange={this.handleNameChange}/>
                        </div>

                        <div className="form-group">
                            <label>Numero Factura</label>
                            <input type="number" value={this.state.bill.bill_ref} onChange={this.handleBillRefChange}/>
                        </div>

                        <div className="form-group">
                            <label>Monto Total</label>
                            
                            <input type="number" value={this.state.bill.price} placeholder="₡" onChange={this.handlePriceChange}/>
                            
                        </div>

                        <div className="form-group select">
                            {this.state.status === 'success' &&
                                <select value = {this.state.bill.area} onChange={this.handleAreaChange} >
                                    <option value="">Seleccione una area</option>
                                    {
                                        this.state.areas.map((area, i) => {
                                           return(<option key ={i} value={area.area_type}>{area.area_type}</option> );
                                        })}
                                </select>
                            
                            }
                            
                        </div>
                        
                        <div className="form-group">
                            
                            <label>Descripcion</label>
                            <textarea name="description" value={this.state.bill.description} onChange={this.handleDescriptionChange} ></textarea>

                        </div>

                        <div className="bill-list ">
                            <label>Fecha Emision</label>
                            <input
                                type="date"
                                value={this.state.bill.date_created}
                                onChange={this.handleDateCreatedChange}/>
            
                        </div>

                        <div className="bill-list ">
                            <label>Fecha de Pago Estimada</label>
                            <input
                                type="date"
                                value={this.state.bill.date_expired}
                                onChange={this.handleDateExpirationChange}/>
            
                        </div>

                        

                        {/*Muestra botones de guardar ó Confirmar guardado si los datos son correctos*/}
                        {this.state.goSend === false ?
                            <div>
                                <div className="clearfix"></div>
                                <input type="button" value="Guardar" className="btn btn-success" onClick={this.send}/>  
                                <NavLink to="/home" className="btn btn-cancel"  >Cancelar</NavLink> 
                            </div>
                        :
                        this.state.goSend === true &&
                            <BtnConfirm
                                object={this.state.bill}
                                objectType="bills"
                                typeConfirm="save"
                                origin="/crear-facturas" 
                                noSend= {this.noSend}      
                            />
                        }

                        {/*Muestra muestra posibles errores en los input de datos*/}
                        {this.state.validationTest.length !==0 &&
                            <div>
                                <p className='subtitle'> Errores en la creación de factura </p>
                                {this.state.validationTest.map((val, i) => {
                                    return( 
                                            <div>
                                                <p id='validation-error'>  {val.msg}  </p>
                                                <div className='clearfix'></div>
                                            </div>
                                        );
                                })}
                            </div>
                        }
                        

                    </form>

                </div>
                                 
                

            {/*End Div BillMacker*/}
            </div> 
                <SideBar/>  
            </div>
        );                            
    } 

    

}
export default BillMacker;

