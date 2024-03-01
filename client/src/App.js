import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './global.css'

import RoutesApp from './routes'

export default function App() {

  return (
    <div>
    <ToastContainer autoClose={3000} />
    <RoutesApp/>
    </div>
  );
}


