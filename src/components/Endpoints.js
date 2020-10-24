import React from 'react';

const Endpoints = ({endpoints, request}) => {
    

    return (
      <div>
        <h2>Choose Your Own Adventure</h2>
        <span className="nav">
        {endpoints.map(point => (
          <h3 key={point.name} onClick={() => request(point.slug)}>
            {point.name}
          </h3>
        ))}
            </span>
      </div>
    );
}

export default Endpoints;