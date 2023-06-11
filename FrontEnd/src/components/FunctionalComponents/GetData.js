import React,{useEffect} from "react";
import axios from "axios";

function GetData({req, setData}){

    const apiUrl= process.env.REACT_APP_API_URL;



    useEffect(()=>{
        axios.get(`${apiUrl}${req}`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{
            setData(res.data);
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
    }, [apiUrl, req, setData]);

    return null;

}

export default GetData;