import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Toaster() {
  return (
    <ToastContainer
      limit={1}
      position="top-center"
      pauseOnHover
      autoClose={5000}
      containerId="main"
    />
  );
}
