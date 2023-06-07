import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

// Componente donde se genera el Slider (Orlando)
class Slider extends Component{
    render(){
        return(
            <div id="slider" className= {this.props.size}>
                <h1>{this.props.title}</h1>
                {this.props.btn &&
                    <NavLink to="#" className="btn-white">{this.props.btn}</NavLink> 
                }

                
            </div>
        );
    }
}
export default Slider;