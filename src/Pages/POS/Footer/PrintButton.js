import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint}>
      Print Receipt Test
    </button>
  );
};

export default PrintButton;
