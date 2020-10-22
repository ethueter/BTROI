import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContainer = () => {
    //most function will be performed here
    const [mainObject, setMainObject] = useState({});
    const baseURL = "https://api.github.com/orgs/boomtownroi"

    const validateResponseObj = (res) => {
        
        if (res.created_at < res.updated_at){
            console.log("valid date");
            setMainObject(res)
        } else {
            console.log("error in dating");
        }

    };

    useEffect(()=> {
        axios.get(baseURL)
            .then((response) => {
                validateResponseObj(response.data);
            }, (error) => {
                console.log(error);
            }
            )
    }, [])
    
    
    // const handleClick = () => {
    //     axios.get(baseURL)
    //     .then((response) => {
    //         validateResponseObj(response.data);
    //     }, (error) => {
    //         console.log(error);
    //     }
            
    //     )
    // }

    return (
        <div>
            <h3>I will be the main container.</h3>
            <button>test</button>
        </div>
    )
}

export default MainContainer;