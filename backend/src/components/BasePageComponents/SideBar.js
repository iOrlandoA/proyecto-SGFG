import React, {Component} from 'react';

// Componente donde se genera el SideBar
class SideBar extends Component{
    render(){
        return(
            <div>
                <aside id="sidebar">
                    
                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra la Factura que buscas</p>
                        <form action="">
                            <input type="text" name="search"/>
                            <input type="submit" name="submit" value="Buscar" className="btn"/>
                        </form>
                    </div>
                </aside>
                <div className="clearfix"></div>
            </div>
        );
    }
}
export default SideBar;