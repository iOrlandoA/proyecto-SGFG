import React, {Component} from 'react';


// Componente encargado de crear la Lista de Facturas


class BillList extends Component{
    //Datos de Prueba borrar a futuro
    state ={
        bills:[

            {
                facturaId: 1,
                type: 'debit',
                name : 'Orlando',
                price : 10000,
                areaTransaction : 'Transporte',
                description:'Vacio',
                dateCreated : '27-8-2019',
                dateExpiration : '27-8-2019', 
            },
            {
                facturaId: 2,
                type: 'debit',
                name : 'Ale',
                price : 2000000,
                areaTransaction : 'Animales',
                description:'Vacio',
                dateCreated : '27-8-2019',
                dateExpiration : '27-8-2019', 
            },
            {
                facturaId: 3,
                type: 'credit',
                name : 'ChantoNix',
                price : 40000,
                areaTransaction : 'Alimentos',
                description:'Vacio',
                dateCreated : '27-8-2019',
                dateExpiration : '27-8-2019', 
            }

        ],
        dateStart : '',
        dateEnd : ''

    }
    //Genera la lista a mostrar (Aprueba de Fallos)
    generateList=() =>{
        try {
            return this.state.bills.map((bill, i) => {
              return (
                <tr className='table-rode' key={i}>
                  <td>{bill.facturaId}</td>
                  <td>{bill.type}</td>
                  <td>{bill.name}</td>
                  <td>{bill.price}</td>
                  <td>{bill.areaTransaction}</td>
                  <td>{bill.dateCreated}</td>
                  <td>{bill.dateExpiration}</td>
                  <td>{bill.description}</td>
                </tr>
              );
            });
          } catch (error) {
            console.error('Error:', error.message);
          }
    }

    // Cambia cuando se selecciona una Fecha Inicio Nueva
    handleDateStartChange = (event) => {
        const {bill}=this.state;
        bill.dateExpiration = event.target.value;
        this.setState({bill});
    }

    // Cambia cuando se selecciona una Fecha Fin Nueva
    handleDateEndChange = (event) => {
        const {bill}=this.state;
        bill.dateCreated = event.target.value;
        this.setState({bill});
        
    }
    

    render(){
        return(
            <div id='bill-list' >
           
                <h2 className='subheader'> Lista de Facturas </h2>

                {/*Se muestran inputs de Fechas*/}
                <div className="bill-list">
                    <label for="dateStart">Fecha Inicio</label>
                    <input
                        type="date" 
                        value={this.state.dateStart}
                        onChange={this.handleDateStartChange}/>

                </div>
            
                <div  className="bill-list">
                    <label for="dateEnd">Fecha Fin</label>
                    <input 
                        type="date"
                        value={this.state.dateEnd}
                        onChange={this.handleDateEndChange}/>

                </div>
                {/*Parte de Titulos de la Tabla*/}      
                <table id="table" className='bill-list'>
                    <tr>
                        <th>ID Factura</th>
                        <th>Tipo Transacion</th>
                        <th>Nombre </th>
                        <th>Precio</th>
                        <th>Area </th>
                        <th>Fecha Creación</th>
                        <th>Fecha Expiración </th>
                        <th>Descripción</th>
                    </tr>
                
                    {this.generateList()}
                </table>
                
                
            </div>
            
        );
    }
}
export default BillList;