import React, { useState } from 'react';
import PrintJS from 'print-js';

function PrinterReceipt() {

  const [ipAddress, setIpAddress] = useState('');

  const handlePrint = () => {
    const printerIpAddress = ipAddress;
    const contentToPrint = "<label>Hello World</label>";

    PrintJS({
      printable: contentToPrint,
      type: 'html',
      targetStyles: ['*'],
      documentTitle: 'Receipt',
      ipAddress: printerIpAddress,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Receipt Printer</h1>
        <input placeholder='192.168.1.100' value={ipAddress} onChange={(e)=>setIpAddress(e.target.value)}/>
        <button disabled={!ipAddress} onClick={handlePrint}>Print Receipt</button>
      </header>
    </div>
  );
}

export default PrinterReceipt;