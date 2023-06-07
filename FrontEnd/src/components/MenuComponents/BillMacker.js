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
            voucher: 0
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
    handleVoucherChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            const {bill}= this.state;
            bill.voucher = event.target.value;
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
        if (this.state.bill.name === "" || this.state.bill.price === 0  ||
            this.state.bill.area === "" || this.state.bill.dateCreated === "" ||  this.state.bill.voucher === 0  ) 
        {
            
            if(this.state.bill.name === ''){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"name", msg:"Nombre vacío"}]
                }));
            } 
            if(this.state.bill.price === 0 ){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"price", msg:"Ingrese el precio o Invalido"}]
                }));
            }
            if(this.state.bill.area === '') {
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"area", msg:"Campo area vacío"}]
                }));
            }
            if(this.state.bill.date_created === ''){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest,{type:"date_created", msg: "Fecha Inicio Vacía"}]
                }));
            } 
            if(this.state.bill.voucher === 0){
                this.setState(prevState =>({
                    validationTest:[...prevState.validationTest, {type:"voucher", msg: "Comprobante Vacío o Invalido"}]
                }));
            } 
            console.log(this.state.validationTest);
            
        }else{
            
            this.setState({goSend:true});
            
        }   
        
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

                        <div className="bill-list ">
                            <label>Fecha Emision</label>
                            <input
                                type="date"
                                value={this.state.date_created}
                                onChange={this.handleDateCreatedChange}/>
            
                        </div>

                        <div className="bill-list ">
                            <label>Fecha de Pago Estimada</label>
                            <input
                                type="date"
                                value={this.state.date_expired}
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
                                typeConfirm="billSave"
                                origin="/crear-facturas"       
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
                <SideBar/>                    
                

            {/*End Div BillMacker*/}
            </div> 
        );                            
    } 

    

}
export default BillMacker;

