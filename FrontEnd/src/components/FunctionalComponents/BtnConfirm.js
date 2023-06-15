import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// Componente Base en el cual Cargar HTML 
class BtnConfirm extends Component{
    apiUrl= process.env.REACT_APP_API_URL;


    handleConfirmation = () => {
        {this.props.typeConfirm === "save" &&
            axios.post(`${this.apiUrl}/${this.props.objectType}`, this.props.object,{
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((res)=>{console.log(res);})
            .catch((err) => {
                console.log(err);
            });  
            
        }


        {this.props.typeConfirm === "update" &&
            axios.put(`${this.apiUrl}/${this.props.objectType}/${this.props.id}`, this.props.object,{
                headers: {
                    'Accept': 'application/json' 
                }
            })
            .then()
            .catch((err) => {
                console.log(err);
            });
            
        }

        {this.props.typeConfirm === "delete" &&
            axios.delete(`${this.apiUrl}/${this.props.objectType}/${this.props.id}`, {
                headers: {
                    'Accept': 'application/json' 
                }
            })
            .then()
            .catch((err) => {
                console.log(err);
            });
            
        }
        
        this.props.noSend();

        
    };

    handleCloseModal = () => {
        // Se regresa al Origen
       return(
            <NavLink to= {this.props.origin}></NavLink>

       );
    };


    render(){


        return(
            <div id='confirm-button' >
                
                <h3>Confirmación</h3>
                <p>¿Estás seguro de que deseas realizar esta acción?</p>
                <button className='btn btn-success' onClick={this.handleConfirmation}>Confirmar</button>
                <button className='btn btn-cancel' onClick={this.handleCloseModal}>Cancelar</button>
                

            </div>


        );
    }
}
export default BtnConfirm;