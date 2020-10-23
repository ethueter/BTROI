import React from 'react';

const Endpoints = ({endpoints, request}) => {
    

    return (
        <div>
            <ul>
           {endpoints.map(point => <li key={point} onClick={()=>request(point)}>{point}</li>)} 
            </ul>
        </div>
    )
}

export default Endpoints;