import React from 'react';

const Card = ({ children }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
      {children}
    </div>
  );
};

export default Card;