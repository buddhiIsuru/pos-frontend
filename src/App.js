import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './Layout/MainLayout/MainLayout';
import Login from './Pages/Login/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import POSView from './Pages/POS/POSView';


function App() {
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/user" element={<MainLayout />} />
      </Routes>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
