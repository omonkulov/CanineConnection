import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Recoil: for state managment */}
    <RecoilRoot>
      {/* React Router Dom: for handling routes */}
      <RouterProvider router={router}/>
    </RecoilRoot>
  </React.StrictMode>
);

