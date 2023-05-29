import React, {Component} from 'react';

class BillMacker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bill : {
                type: 'credit',
                name : '',
                price : 0,
                areaTransaction : '',
                description : '',
                dateCreated : '',
                dateExpiration : '', 
            }
        };
    }


     // Cambia cuando se cambia el nombre
    
    handleTypeChange = (event) => {
        const {bill}= this.state;
        bill.type = event.target.value;
        this.setState({bill});
    }



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



    // Cambia cuando se selecciona una Area Nueva
    handleAreaChange = (event) => {
        const {bill}= this.state;
        bill.areaTransaction = event.target.value;
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
        bill.dateCreated = event.target.value;
        this.setState({bill});
        
    }
    // Cambia cuando se selecciona una Fecha Expiracion Nueva
    handleDateExpirationChange = (event) => {
        const {bill}=this.state;
        bill.dateExpiration = event.target.value;
        this.setState({bill});
    }

   
    

    //Envia los datos a la API
    send =() =>{
        
    }
    

    // Genera un mensaje confirmación Datos de la Factura
    confirm = () =>{
        console.log(this.state.bill.type); 
        console.log(this.state.bill.name); 
        console.log(this.state.bill.price); 
        console.log(this.state.bill.areaTransaction); 
        console.log(this.state.bill.description); 
        console.log(this.state.bill.dateCreated); 
        console.log(this.state.bill.dateExpiration); 

    }

    
    render(){

        const areas= ['Transporte', 'Alimentos' ,'Animal']; // Falta cargar de el API

        return(
            <div className="center">
                <section id="content">
                    
                    <h1 className="subheader">Factura</h1>
                    <form className="mid-form">

                        <div className="form-group radiobuttons">
                            <input type="radio" name="typeTransaction" value="credit" checked={this.state.bill.type === 'credit'}  onChange={this.handleTypeChange}/> Credito 
                            <input type="radio" name="typeTransaction" value="debit" checked={this.state.bill.type === 'debit'} onChange={this.handleTypeChange}/> Debito
                        </div>
                        

                        <div className="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" name="name" onChange={this.handleNameChange}/>
                        </div>


                        <div className="form-group">
                            <label for="price">Precio</label>
                            <input type="number" name="price" placeholder="₡" onChange={this.handlePriceChange}/>
                        </div>

                        <div className="form-group select">
                            
                            <select value = {this.state.bill.areaTransaction} name="areaTransaction" onChange={this.handleAreaChange} >
                                <option value="">Seleccione una opción</option>
                                {
                                    areas.map((type, i) => {
                                        return(<option key ={i} value={type}>{type}</option> );
                                    })}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            
                            <label for="description">Descripcion</label>
                            <textarea name="description" onChange={this.handleDescriptionChange} ></textarea>

                        </div>

                        <div className="form-group">
                            <label for="dateCreated">Fecha Emision</label>
                            <input
                                id="dateCreated"
                                type="date"
                                name="dateCreated" 
                                value={this.state.dateCreated}
                                onChange={this.handleDateCreatedChange}/>
            
                        </div>

                        <div className="form-group">
                            <label for="dateExpiration">Fecha de Pago Estimada</label>
                            <input
                                id="dateExpiration"
                                type="date"
                                name="dateExpiration"
                                value={this.state.dateExpiration}
                                onChange={this.handleDateExpirationChange}/>
            
                        </div>

                        <div className="clearfix"></div>
                        <input type="button" value="Enviar" className="btn btn-success" onClick={this.confirm}/>


                    </form>

                </section>
            </div>
        );
    } 

    

}
export default BillMacker;

