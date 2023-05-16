import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './Layout/MainLayout/MainLayout';
import Login from './Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import POSView from './Pages/POS/POSView';

function App() {
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<MainLayout />} />
        {/* <Route path="/user/pos" element={<POSView />} /> */}
      </Routes>
    </div>
  );
}

export default App;
