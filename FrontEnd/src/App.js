import React from 'react';
import './assets/css/App.css';
import Header from './components/BasePageComponents/Header';
import Slider from './components/BasePageComponents/Slider';
import SideBar from './components/BasePageComponents/SideBar';
import Footer from './components/BasePageComponents/Footer';
import Router from './components/Router';

function App() {

  return (
    <div className="App">
      
      {/*Aquí se carga el Header de la Pantalla*/}
      <Header/>       

      {/*Aquí se genera la barra Slider que Divide el Header*/}
      <Slider/>      

      
      {/*Aqui se muestra el Contenido Central*/}
      <div className='center'>
        <section id='content'>
          <section className='components'>
            
            {/*Aquí se cargan los componentes funcionales*/}
            <Router /> 

          </section>
        </section>


        {/*Aquí se genera el cuadrante del lado derecho Slider para buscar facturas*/}
        <SideBar/> 
        <div className="clearfix"></div> {/*Divide la parte de arriba con el Footer*/}

      </div>

      {/*Aquí se genera el Footer de la Pagina*/}
      <Footer/> 

      
    </div>
    
  );
}

export default App;









/*
  extra de Ale
  const getData = async(url) => {
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
      })
      .then(res => res.json());
      console.log(newData);
  }

  getData('/api');
*/
