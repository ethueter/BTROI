import React from 'react';

const DisplayItem = ({item}) => {
    

    return (
      <span>
        <h4>
          {item.id} - {item.name || item.type}
        </h4>
      </span>
    );
}

export default DisplayItem;