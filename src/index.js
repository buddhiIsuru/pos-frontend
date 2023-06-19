import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login/Login';
import MainLayout from './Layout/MainLayout/MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user",
    element: <MainLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <RouterProvider router={router} />
  <React.StrictMode>
    <BrowserRouter>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
