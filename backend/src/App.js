import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import BillMacker from './components/BillMacker.js';


function App() {

/*
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
  return (
    <div className="App">
      <section className='components'>
        <BillMacker />
      </section>
    </div>
    
  );
}

export default App;
