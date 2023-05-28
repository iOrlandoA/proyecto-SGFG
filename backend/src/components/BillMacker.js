import React, {Component} from 'react';
import '../assets/css/App.css';




class BillMacker extends Component{

    constructor(props) {
        super(props);
        this.state = {
            areaTransaction : '',
            dateCreated : '',
            dateExpiration : '',
            
        };
        
        

      }

    
    handleAreaChange = (event) => {

        this.setState({ areaTransaction: event.target.value });
        console.log(this.state.areaTransaction); 
    }

    handleDateCreatedChange = (event) => {
        this.setState({ dateCreated: event.target.value });
        console.log(this.state.dateCreated); 
    }
    
    handleDateExpirationChange = (event) => {
        this.setState({ dateExpiration: event.target.value });
        console.log(this.state.dateExpiration); 
    }
    
    
    render(){

      

        const areas= ['Transporte', 'Alimentos' ,'Animal'];

        return(
            <div className="center">
                <section id="content">
                    
                    <h1 className="subheader">Factura</h1>
                    <form className="mid-form">

                        <div className="form-group radiobuttons">
                            <input type="radio" name="typeTransaction" value="credit" checked /> Credito 
                            <input type="radio" name="typeTransaction" value="debit"/> Debito
                        </div>
                        

                        <div className="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" name="name"/>
                        </div>

                        
                        <div className="form-group">
                            <label for="quantity">Cantidad</label>
                            <input type="number" name="quantity"/>
                        </div>

                        <div className="form-group">
                            <label for="price">Precio</label>
                            <input type="number" name="price" placeholder="₡"/>
                        </div>

                        <div className="form-group select">
                            
                            <select value = {this.state.areaTransaction} name="areaTransaction" onChange={this.handleAreaChange} >
                                <option value="">Seleccione una opción</option>
                                {
                                    areas.map((type, i) => {
                                        return(<option key ={i} value={type}>{type}</option> );
                                    })}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            
                            <label for="description">Descripcion</label>
                            <textarea name="description"></textarea>

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
                        <input type="submit" value="Enviar" className="btn btn-success"/>


                    </form>

                </section>
            </div>
        );
    } 

    

}
export default BillMacker;

