import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import POSMainLayout from './Layout/POSMainLayout/POSMainLayout';
import MainLayout from './Layout/MainLayout/MainLayout';
import Invoice from './Pages/Invoice/Invoice';
import Dashboard from './Pages/Dashboard/Dashboard';
import StoreStatus from './Pages/StoreStatus/StoreStatus';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/pos" element={<POSMainLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/main" element={<MainLayout />} >
          <Route path="/main/dashboard" exact element={<Dashboard />} />
          <Route path="/main/invoice" element={<Invoice />} />
          <Route path="/main/close-store" element={<StoreStatus />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
