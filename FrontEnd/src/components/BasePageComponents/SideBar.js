import React, {Component} from 'react';
import axios from 'axios';
import BillTable from '../FunctionalComponents/BillTable';

// Componente donde se genera el SideBar (Orlando)
class SideBar extends Component{


    state={
        voucher:0,
        bill: {},
        status: ''
    }

    getBill = ()=>{
        axios.get(`${this.apiUrl}/bills?voucher=${this.state.voucher}`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{

            this.setState({
                bill: res.data,
                status: 'success'
            });
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
         
    }



    // Cambia cuando se cambia el Comprobante
    handleVoucherChange = (event) => {
        if (!isNaN(event.target.value)=== true){
            this.setState({voucher:event.target.value});
        }    
    }


    render(){
        return(
            <div>
                <aside id="sidebar">
                    
                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra la Factura que buscas</p>
                        <form action="">
                            <input type="text" value={this.state.voucher}  name="search" onChange={this.handleVoucherChange}/>
                            <input type="button" value="Buscar" className="btn btn-success" onClick={this.getBill}/> 
                        </form>
                        
                       
                    </div>
                </aside>
                <div className="clearfix"></div>
                {this.state.status === 'success' &&
                    <div className='center' >
                        {console.log('paso')}
                        <BillTable
                            bills= {this.state.bill}
                        />
                    </div>
                }
            </div>
        );
    }
}
export default SideBar;