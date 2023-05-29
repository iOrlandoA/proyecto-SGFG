import React, {Component} from 'react';
import BillMacker from './MenuComponents/BillMacker';
import BillList from './MenuComponents/BillList';
// Componente Base en el cual Cargar HTML 
class Center extends Component{
    render(){


        return(
            
            //<BillMacker/>
            <BillList/>

        );


    }
}
export default Center;