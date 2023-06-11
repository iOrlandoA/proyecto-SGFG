import React,{useState, useEffect} from "react";
import axios from "axios";

function GetData(props){

    const apiUrl= process.env.REACT_APP_API_URL;

    const [data, setData] = useState([]);


    useEffect(()=>{
        axios.get(`${apiUrl}${props.req}`, {
            headers: {
                'Accept': 'application/json', 
            }
        }).then(res =>{
            setData(res.data);
    
        }).catch(error => {
            // Manejar el error
            console.error(error);
          });
    },[]);

    return data;

}

export default GetData;