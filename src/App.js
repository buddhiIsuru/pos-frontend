// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './Pages/Login/Login';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import POSMainLayout from './Layout/POSMainLayout/POSMainLayout';
// import MainLayout from './Layout/MainLayout/MainLayout';
// import Invoice from './Pages/Invoice/Invoice';
// import Dashboard from './Pages/Dashboard/Dashboard';
// import StoreStatus from './Pages/StoreStatus/StoreStatus';


// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" exact element={<Login />} />
//         <Route path="/pos" element={<POSMainLayout />} />
//         <Route path="*" element={<Navigate to="/" />} />
//         <Route path="/main" element={<MainLayout />} >
//           <Route path="/main/dashboard" exact element={<Dashboard />} />
//           <Route path="/main/invoice" element={<Invoice />} />
//           <Route path="/main/close-store" element={<StoreStatus />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import PrintJS from 'print-js';

function App() {

  const [ipAddress, setIpAddress] = useState('');

  const handlePrint = () => {
    const printerIpAddress = ipAddress;
    const contentToPrint = `
      <div>
        <h1>Receipt</h1>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Amount: $50.00</p>
        <!-- Additional receipt content here -->
      </div>
    `;

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

export default App;
