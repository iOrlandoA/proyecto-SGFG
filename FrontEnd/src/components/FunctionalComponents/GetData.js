import React,{useEffect} from "react";
import axios from "axios";
// Get all Data for Use On All Component 
function GetData({req, setData}){
    // Get the Api URL from .ENV
    const apiUrl= process.env.REACT_APP_API_URL;


    // Get the DATA with axios Library
    useEffect(()=>{
        axios.get(`${apiUrl}${req}`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{
            // Usage a Function to Return Data
            setData(res.data);
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
    }, [apiUrl, req, setData]);

    return null;

}

export default GetData;